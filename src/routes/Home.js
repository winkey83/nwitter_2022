import { dbService } from "fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document)=> {
            const nweetObject = {...document.data(), id: document.id };
            setNweets((prev)=>[nweetObject, ...prev])
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
    
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target:{value}
        } = event;
        setNweet(value);
    };

    useEffect( ()=>{
        getNweets();
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text"  placeholder="say something." maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {
                    nweets.map((nweet)=>(
                        <div key={nweet.id}>
                            <h4>{nweet.text}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home;
import { dbService } from "fbase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     dbNweets.forEach((document)=> {
    //         const nweetObject = {...document.data(), id: document.id };
    //         setNweets((prev)=>[nweetObject, ...prev])
    //     });
    // };

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
        onSnapshot(collection(dbService, "nweets"), (snapshot)=>{
            const newArray = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(newArray);
        });
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
                        <Nweet 
                            key={nweet.id} 
                            nweetObj={nweet}
                            isOwner={nweet.creatorId==userObj.uid}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default Home;
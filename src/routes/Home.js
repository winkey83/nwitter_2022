import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot) => {
            const newArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(newArray);
        });
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {
                    nweets.map((nweet) => (
                        <Nweet
                            key={nweet.id}
                            nweetObj={nweet}
                            isOwner={nweet.creatorId == userObj.uid}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default Home;
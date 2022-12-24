import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        const col = collection(dbService, "nweets");
        // addDoc(col, {
        //     nweet,
        //     createdAt: Date.now(),
        // });
      
        setNweet("");
    };

    const onChange = (event) => {
        const {
            target:{value}
        } = event;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text"  placeholder="say something." maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    )
}
export default Home;
import React from "react";
import { dbService } from "fbase";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";

const Nweet = ({nweetObj, isOwner})=>{
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제할텨?");
        if(ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
        }
    };

    return (
        <div>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    );
};

export default Nweet;
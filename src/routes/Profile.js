import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => authService.signOut();

    // const getMyNweets = async () => {
    //     const q = query(
    //         collection(dbService, "nweets"),
    //         where("creatorId", "==", userObj.uid),
    //         orderBy("createdAt", "asc")
    //     );
    //     const dbNweets = await getDocs(q);
    //     dbNweets.forEach((document)=> {
    //         const nweetObject = {...document.data(), id: document.id };
    //         setNweets((prev)=>[nweetObject, ...prev])
    //     });
    // };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName != newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };

    useEffect(() => {
        //getMyNweets();
    }, []);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} autoFocus className="formInput" />
                <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10 }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </div>
    );
};

export default Profile
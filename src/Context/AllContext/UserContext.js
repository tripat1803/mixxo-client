import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Config/firebase";
import { publicApi } from '../../Api/Api';
import { toast } from 'react-hot-toast';

export const UserContext = createContext();

function UserState({ children }) {
    const [user, setUser] = useState();
    const [mongoUser, setMongoUser] = useState();
    const [loader, setLoader] = useState(true);
    const [mongoFlag, setMongoFlag] = useState(false);

    const createFirebaseUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginFirebaseUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signoutUser = async () => {
        setLoader(true);
        await signOut(auth).then(() => {
            setUser(undefined);
            setMongoUser(undefined);
            setLoader(false);
        }).catch((err) => {
            if (err.request.status) {
                return toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        });
    }
    const getMongoUser = async (user) => {
        if (user) {
            let token = await getIdToken(user);
            publicApi.get("/user/get", {
                headers: {
                    authorization: token
                }
            }).then((res) => {
                setMongoUser(res.data);
                setLoader(false);
            }).catch(() => {
                setLoader(false);
            });
        } else {
            setLoader(false);
        }
    }

    useEffect(() => {
        setLoader(true);
        onAuthStateChanged(auth, (userCreds) => {
            setUser(userCreds);
            getMongoUser(userCreds);
        });
    }, []);

    if (mongoFlag) {
        getMongoUser(user);
        setMongoFlag(false);
    }

    return (
        <UserContext.Provider value={{ user, loader, mongoUser, setUser, setLoader, setMongoUser, createFirebaseUser, loginFirebaseUser, signoutUser, getMongoUser, setMongoFlag }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;
import { getIdToken } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { publicApi } from '../../Api/Api';
import { UserContext } from './UserContext';
import { toast } from 'react-hot-toast';

export const CartContext = createContext();

function CartState({ children }) {

    let user = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [loader, setLoader] = useState(false);
    const [firebaseUser, setFirebaseUser] = useState();

    const fetchCart = async () => {
        let token = await getIdToken(user.user);
        return publicApi.get("/cart/", {
            headers: {
                authorization: token
            }
        });
    }

    const fetchCartwithoutLoader = async () => {
        let token = await getIdToken(user.user);
        publicApi.get("/cart/", {
            headers: {
                authorization: token
            }
        }).then((res) => {
            setCart(res.data.products);
        }).catch(() => {
            toast.error("Server error occured")
        });
    }

    const fetchCartData = async (user) => {
        if (user) {
            setLoader(true);
            let token = await getIdToken(user);
            publicApi.get("/cart/", {
                headers: {
                    authorization: token
                }
            }).then((res) => {
                setCart(res.data.products);
                setLoader(false);
            }).catch(() => {
                setLoader(false);
            });
        }
    }

    const updateCart = async (productId, detailId, type) => {
        let token = await getIdToken(user.user);
        return publicApi.post(`/cart/${type}`, {
            productId: productId,
            detailsId: detailId,
        }, {
            headers: {
                authorization: token
            }
        })
    }

    useEffect(() => {
        if (user.user) {
            setFirebaseUser(user.user);
            fetchCartData(user.user);
        }
    }, [user.user]);

    if (flag) {
        fetchCartData(firebaseUser);
        setFlag(false);
    }

    if (flag2) {
        fetchCartwithoutLoader();
        setFlag2(false);
    }

    return (
        <CartContext.Provider value={{ cart, flag, loader, setLoader, setCart, setFlag, fetchCart, updateCart, setFlag2 }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartState;
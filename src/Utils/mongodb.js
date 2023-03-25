import { publicApi } from "../Api/Api"

export const createUser = (user) => {
    return publicApi.post("/user/create", user);
}

export const getUser = async (firebase_id) => {
    await publicApi.post("/user/get", {
        firebase_id: firebase_id
    })
}
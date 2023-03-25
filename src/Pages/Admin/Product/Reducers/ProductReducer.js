export const productReducer = (state, action) => {
    switch(action.type){
        case "NAME":
            return { ...state, name: action.payload.data }
        case "DESCRIPTION":
            return { ...state, description: action.payload.data }
        case "CATEGORIES":
            return { ...state, categoryId: action.payload.data }
        case "CLEAR":
            return {
                name: "",
                price: -1,
                discount: -1,
                description: "",
                categoryId: ""
            }
        default:
            return state
    }
}
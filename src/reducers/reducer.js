const defaultState = {
    userToken: undefined,
    username: undefined
}

function reducer(state=defaultState, action) {
    switch(action.type){
        case "SET_TOKEN":
            return {
                ...state,
                userToken: action?.payload?.token,
                username: action?.payload?.username
            }
        default: 
            return state;
    }
}

export default reducer;
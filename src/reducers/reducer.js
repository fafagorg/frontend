const defaultState = {
    userToken: ''
}

function reducer(state=defaultState, action) {
    switch(action.type){
        case "SET_TOKEN":
            return {
                ...state,
                userToken: action.payload
            }
        default: 
            return state;
    }
}

export default reducer;
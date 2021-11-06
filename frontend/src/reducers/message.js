import {
    DRAWINGS_LOADED
} from "../actions/types";

const initialState = {
    type: null, // success, or failed
    message: null,
};

const actionMap = {
    SET_MESSAGE: (state, action) => {
        return {
            ...state,
            type: action.payload.type,
            content: action.payload.content,
        };
    },
};

export default function(state = initialState, action) {
    for(let actionType in actionMap){
        if(action.type === actionType){
            return actionMap[actionType](state, action);
            break;
        }
    }

    return {...state};
};

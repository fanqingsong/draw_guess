import {
    DRAWINGS_LOADED
} from "../actions/types";

const initialState = {
    all: [], // for one drawing
};

const actionMap = {
    DRAWING_COMMENTS_LOADED: (state, action) => {
        return {
            ...state,
            all: action.payload
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

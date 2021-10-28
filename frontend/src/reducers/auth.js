import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

const actionMap = {
    USER_LOADING: (state, action) => {
        return {
            ...state, 
            isLoading: true
        };
    },
    USER_LOADED: (state, action) => {
        return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload
        };
    },
    LOGIN_SUCCESS: (state, action) => {
        localStorage.setItem("token", action.payload.token);

        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false
        };
    },
    LOGOUT_SUCCESS: (state, action) => {
        localStorage.removeItem("token");

        return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
        };
    },
    LOGIN_FAIL: (state, action) => {
        localStorage.removeItem("token");

        return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
        };
    }
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

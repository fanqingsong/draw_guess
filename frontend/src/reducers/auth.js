import {
    ME_LOADED,
    ALL_USERS_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    me: null,
    allUsers: [],
};

const actionMap = {
    ME_LOADED: (state, action) => {
        return {
            ...state,
            isAuthenticated: true,
            me: action.payload
        };
    },
    ALL_USERS_LOADED: (state, action) => {
        return {
            ...state,
            allUsers: action.payload
        };
    },
    LOGIN_SUCCESS: (state, action) => {
        localStorage.setItem("token", action.payload.auth_token);

        return {
            ...state,
            token: action.payload.auth_token,
            isAuthenticated: true,
        };
    },
    LOGOUT_SUCCESS: (state, action) => {
        localStorage.removeItem("token");

        return {
            ...state,
            token: null,
            me: null,
            isAuthenticated: false,
        };
    },
    LOGIN_FAIL: (state, action) => {
        localStorage.removeItem("token");

        return {
            ...state,
            token: null,
            me: null,
            isAuthenticated: false,
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

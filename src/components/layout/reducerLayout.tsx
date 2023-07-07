import { actionTypes } from "./configLayout";

const initialAuthState = {
    locale: null,
    devicesUniqueId: null,
};

export const reducerLayout = (state = initialAuthState, action: any): any => {
    switch (action.type) {
        case actionTypes.Locale: {
            return { ...state, ...action.payload, action: action.type };
        }
        case actionTypes.DevicesUniqueId: {
            return { ...state, ...action.payload, action: action.type };
        }
        default:
            return state;
    }
};
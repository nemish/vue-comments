import { v4 } from 'uuid';
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { createLogger } from 'redux-logger';

export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';
export const USER_ENTER = 'USER_ENTER';
export const USER_EXIT = 'USER_EXIT';

const logger = createLogger();

const notifications = (state = [], action) => {
    switch(action.type) {
        case NEW_NOTIFICATION:
            return [...state, action.data];
        case RESET_NOTIFICATION:
            return state.filter(item => item.id != action.data);
        default:
            return state;
    }
}


const user = (state = {}, action) => {
    switch(action.type) {
        case USER_ENTER:
            return {
                ...state,
                name: action.data || 'Anonymous user'
            };
        case USER_EXIT:
            return {};
        default:
            return state;
    }
}

const reducer = combineReducers({
    notifications,
    user
});

const store = createStore(reducer, applyMiddleware(logger));

export default store;

export const notification = (msg, type) => {
    const id = v4();
    store.dispatch({
        type: NEW_NOTIFICATION,
        data: {
            msg,
            id,
            type
        }
    });

    if (type !== 'error') {
        setTimeout(() => {
            store.dispatch({
                type: RESET_NOTIFICATION,
                data: id
            });
        }, 2000);
    }
}
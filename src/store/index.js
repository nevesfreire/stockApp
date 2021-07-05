import { createStore } from "redux";
const INITIAL_STATE = {
    data: [],
}

function previousSearches(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_SEARCH':
            return { ...state, data: [...state.data, action.content] };
        case 'CLEAR':
            return {...state, data: []}
        default:
            return state;
    }
}

const store = createStore(previousSearches);

export default store;
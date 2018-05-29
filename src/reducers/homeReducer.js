const initState = {
    venues: [],
    searchHistory: [],
    user: null
};

function homeReducer(state = initState, action) {
    switch (action.type) {
        case 'LOGIN_GET_USER_DATA':
            return {
                ...state, ...{user: action.data},
                ...{searchHistory: action.data.searchHistory || []},
                ...{venues: action.data.venues || []}
            };
        case 'LOG_OUT':
            return {...state, ...{user: null}, ...{searchHistory: []}, ...{venues: []}};

        default:
            return state;
    }
}

export default homeReducer;
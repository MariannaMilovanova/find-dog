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
        case 'SEARCH_VENUES': {
            let searchHistoryItem = {};
            searchHistoryItem.id = action.payload.data.meta.requestId;
            searchHistoryItem.term = action.meta.term;
            searchHistoryItem.center = action.meta.center;
            searchHistoryItem.radius = action.meta.radius;
            searchHistoryItem.date = new Date();
            if (state.user) {
                let userId = localStorage.getItem('active');
                if (localStorage.getItem('active')) {
                    let userData = JSON.parse(localStorage.getItem(userId))
                    userData.searchHistory.push(searchHistoryItem);
                    userData.venues = action.payload.data.response.venues;
                    localStorage.setItem(`${userData.googleId}`, JSON.stringify(userData));
                }
            }
            return {
                ...state, ...{venues: action.payload.data.response.venues},
                ...{searchHistory: state.searchHistory.concat(searchHistoryItem)}
            };
        }
        case 'DELETE_SEARCH_QUERY_FROM_HISTORY': {
            if (state.user) {
                let userId = localStorage.getItem('active');
                if (localStorage.getItem('active')) {
                    let userData = JSON.parse(localStorage.getItem(userId))
                    userData.searchHistory = userData.searchHistory.filter(item => item.id !== action.id);
                    userData.venues = [];
                    localStorage.setItem(`${userData.googleId}`, JSON.stringify(userData));
                }
            }
            return {
                ...state,
                ...{searchHistory: state.searchHistory.filter(item => item.id !== action.id)}
            };
        }

        default:
            return state;
    }
}

export default homeReducer;
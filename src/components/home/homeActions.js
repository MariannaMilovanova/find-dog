import axios from 'axios';

const REACT_APP_FSQ_CLIENT_ID = 'FQH2NY2X2HZSLE4ZGZHGZA1QKHXQMORQBZBAGYIMHE0B3H0N';
const REACT_APP_FSQ_SECRET = 'CFBEJZRCRT35A01121FBIFI4GFQLHOWUUALYUKVX2ZTMUQWY';

export const searchVenues = (term, center, radius) => {
    const ROOT_URL ='https://api.foursquare.com/v2/venues/search';
    const CLIENT_ID =`client_id=${REACT_APP_FSQ_CLIENT_ID}`;
    const CLIENT_SECRET =`client_secret=${REACT_APP_FSQ_SECRET}`;
    const CENTER = `ll=${center.lat},${center.lng}`;
    const RADIUS = `radius=${radius}`;
    const QUERY = `query=${term}`;
    const VERSION = `v=20171022`;
    const M = `m=foursquare`;

    const request = axios.get(`${ROOT_URL}/?${CLIENT_ID}&${CLIENT_SECRET}&${CENTER}&${RADIUS}&${QUERY}&${VERSION}&${M}`);
    return {
        type: 'SEARCH_VENUES',
        payload: request,
        meta: { term, center, radius }
    };
};

export const deleteQuery = (id) => {
    return {
        type: 'DELETE_SEARCH_QUERY_FROM_HISTORY',
        id
    };
};

export function userLogin(data) {
    return {
        type: 'LOGIN_GET_USER_DATA',
        data
    };
}

export function userLogout() {
    return {
        type: 'LOG_OUT'
    };
}

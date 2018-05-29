import { combineReducers } from 'redux';
import user from './user';
import markers from './markers'

const rootReducer = combineReducers({
  user,
  markers
});

export default rootReducer;

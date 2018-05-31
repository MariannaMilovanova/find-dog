import { combineReducers } from 'redux';
import user from './user';
import markers from './markers';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user,
  markers,
  form: formReducer
});

export default rootReducer;

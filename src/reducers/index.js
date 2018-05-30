import { combineReducers } from 'redux';
import user from './user';
import markers from './markers';
import pets from './pets';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user,
  markers,
  pets,
  form: formReducer
});

export default rootReducer;

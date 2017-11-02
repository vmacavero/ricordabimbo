import { combineReducers } from 'redux';
import ChildInfoReducer from './ChildInfoReducer';

export default combineReducers({
  childInfoReducer: ChildInfoReducer
});

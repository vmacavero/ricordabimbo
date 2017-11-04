import {
  SET_NUMBER_OF_CHILDREN
} from '../actions/types';

const INITIAL_STATE = {
name: []

};

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
    default:
      return INITIAL_STATE;
    case SET_NUMBER_OF_CHILDREN:
      return action.payload;
 }
};


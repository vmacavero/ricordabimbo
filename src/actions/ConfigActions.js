import {
  SET_NUMBER_OF_CHILDREN
} from './types';

export const setNumberOfChildren = (childrenNumber) => {
  return {
    type: SET_NUMBER_OF_CHILDREN,
    payload: childrenNumber
  };
};

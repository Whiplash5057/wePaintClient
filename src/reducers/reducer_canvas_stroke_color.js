import { SET_STROKECOLOR } from '../actions';
import _ from 'lodash';

export default function(state = "#000", action) {
  switch (action.type) {
    case SET_STROKECOLOR:
      // console.log(action.payload);
      return action.payload;
      break;
    default:
      return state;
  }
}
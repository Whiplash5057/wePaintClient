import { SET_BACKGROUNDCOLOR } from '../actions';
import _ from 'lodash';

export default function(state = "#fff", action) {
  // console.log(action.payload);
  switch (action.type) {
    case SET_BACKGROUNDCOLOR:
      // console.log(action.payload);
      return action.payload;
      break;
    default:
      return state;
  }
}
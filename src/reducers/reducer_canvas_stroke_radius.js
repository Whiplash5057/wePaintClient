import { SET_STROKERADIUS } from '../actions';
import _ from 'lodash';

export default function(state = "1", action) {
  switch (action.type) {
    case SET_STROKERADIUS:
      // console.log(action.payload);
      return action.payload;
      break;
    default:
      return state;
  }
}
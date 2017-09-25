import { SET_GRADIENTCOLOR, DISABLE_GRADIENTCOLOR } from '../actions';
import _ from 'lodash';

export default function(state = {colors:['#000', '#FF530C'], enableGradient: false}, action) {
  switch (action.type) {
    case SET_GRADIENTCOLOR:
      // console.log(action.payload);
      return action.payload;
      break;
      case DISABLE_GRADIENTCOLOR:
      // console.log(action.payload);
      return action.payload;
      break;
    default:
      return state;
  }
}
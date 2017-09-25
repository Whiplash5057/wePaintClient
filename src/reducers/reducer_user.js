import { SET_USERNAME } from '../actions';
import _ from 'lodash';

export default function(state = "ENTER NAME", action) {
  switch (action.type) {
    case SET_USERNAME:

      // console.log(action.payload);
      return action.payload;
      break;
    // case FETCH_POST:

      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;

    //   return { ...state, [action.payload.data.id]: action.payload.data };
    //   break;
    // case DELETE_POST:
    //   return _.omit(state, action.payload);
    //   break;
    default:
      return state;
  }
}
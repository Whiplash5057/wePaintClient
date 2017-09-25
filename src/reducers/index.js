import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import StrokeRadius from './reducer_canvas_stroke_radius';
import BackgroundColor from './reducer_canvas_background_color';
import StrokeColor from './reducer_canvas_stroke_color';
import GradientColor from './reducer_canvas_gradient_color';
import Opacity from './reducer_canvas_opacity';

const rootReducer = combineReducers({
  user: UserReducer,
  strokeRadius: StrokeRadius,
  backgroundColor: BackgroundColor,
  strokeColor: StrokeColor,
  gradientColor: GradientColor,
  opacity: Opacity,
});

export default rootReducer;

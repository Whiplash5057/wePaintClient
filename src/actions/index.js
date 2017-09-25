export const SET_USERNAME = 'set_username';
export const SET_STROKERADIUS = 'setStrokeRadiusValue';
export const SET_BACKGROUNDCOLOR = 'setBackgroundColorValue';
export const SET_STROKECOLOR = 'setStrokeColor';
export const SET_GRADIENTCOLOR = 'setGradientColor';
export const DISABLE_GRADIENTCOLOR = 'disableGradientColor';
export const SET_OPACITY = 'setOpacity';


export function setUsername(username, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  return {
    type: SET_USERNAME,
    payload: username,
  };
}

export function setStrokeRadiusValue(value, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  return {
    type: SET_STROKERADIUS,
    payload: value,
  };
}

export function setBackgroundColorValue(value, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  return {
    type: SET_BACKGROUNDCOLOR,
    payload: value,
  };
}

export function setStrokeColorValue(value, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  return {
    type: SET_STROKECOLOR,
    payload: value,
  };
}

export function setGradientColorValue(value, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  let payloadObject = {colors: value, enableGradient: true}
  return {
    type: SET_GRADIENTCOLOR,
    payload: payloadObject,
  };
}

export function disableGradientColorValue(value, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  let payloadObject = {colors: ['#000', '#FF530C'], enableGradient: false}
  return {
    type: DISABLE_GRADIENTCOLOR,
    payload: payloadObject,
  };
}

export function setOpacityValue(value, callback) {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  callback();
  return {
    type: SET_OPACITY,
    payload: value,
  };
}
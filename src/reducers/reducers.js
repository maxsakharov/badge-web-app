import { combineReducers } from 'redux';
import { SHOW_BADGES_LIST, SHOW_BADGE_UPLOAD_FORM, SHOW_PARKING_MAP, SHOW_PARKING_RECEIPT } from '../actions/actions';

const defaultState = {
  screen: '',
};

function app(state = defaultState, action = {}) {
  switch (action.type) {
    case SHOW_BADGES_LIST:
      return {
        ...state,
        screen: 'BADGES_LIST',
      };
    case SHOW_BADGE_UPLOAD_FORM:
      return {
        ...state,
        screen: 'BADGE_UPLOAD_FORM',
      };
    case SHOW_PARKING_MAP:
      return {
        ...state,
        screen: 'PARKING_MAP',
      };
    case SHOW_PARKING_RECEIPT:
      return {
        ...state,
        screen: 'PARKING_RECEIPT',
      };
    default:
      return {
        ...state,
        screen: '',
      };
  }
}

const badgesApp = combineReducers({
  app,
});

export default badgesApp;

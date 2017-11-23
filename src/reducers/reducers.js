import { combineReducers } from 'redux'
import { SHOW_BADGE_UPLOAD_FORM, SHOW_PARKING_MAP } from '../actions/actions';

const defaultState = {
  screen: '',
};

function app(state = defaultState, action = {}) {
  switch (action.type) {
    case SHOW_BADGE_UPLOAD_FORM:
        return {
            ...state,
            screen: 'BADGE_UPLOAD_FORM'
        }
    case SHOW_PARKING_MAP:
        return {
            ...state,
            screen: 'PARKING_MAP'
        }
    default:
        return {
          ...state,
          screen: ''
        }
  }
}

const badgesApp = combineReducers({
  app,
});

export default badgesApp;
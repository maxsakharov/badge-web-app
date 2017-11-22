import { combineReducers } from 'redux'
import { SHOW_BADGE_UPLOAD_FORM, HIDE_BADGE_UPLOAD_FORM } from '../actions/actions';

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
    case HIDE_BADGE_UPLOAD_FORM:
        return {
            ...state,
            screen: ''
        }
    default:
      return state
  }
}

const badgesApp = combineReducers({
  app,
});

export default badgesApp;
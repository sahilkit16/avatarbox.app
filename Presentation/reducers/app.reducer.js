import ACTION_TYPES from '../actions/action-types';
import appState from './app.state';

export default (state = appState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_USER: {
      return Object.assign(state, { user: action.user });
    }
    default:
      return state;
  }
}
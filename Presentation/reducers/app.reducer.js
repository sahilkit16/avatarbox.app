import ACTION_TYPES from "../actions/action-types";
import appState from "./app.state";

const reducer = (state = appState, action) => {
  switch (action.type) {
    case ACTION_TYPES.BUST_CACHE: {
      const user = Object.assign({}, state.user, {
        cacheBuster: action.cacheBuster,
      });
      return Object.assign({}, state, { user });
    }
    case ACTION_TYPES.RELOAD_CALENDAR: {
      const { calendar } = state;
      calendar.images = action.calendarImages;
      return Object.assign({}, state, { calendar });
    }
    case ACTION_TYPES.TOGGLE_CALENDAR: {
      return Object.assign({}, state, { calendar: action.calendar });
    }
    case ACTION_TYPES.UPDATE_USER: {
      return Object.assign({}, state, { user: action.user });
    }
    case ACTION_TYPES.SELECT_ICON: {
      return Object.assign({}, state, {
        selectedIcon: action.selectedIcon,
        menu: { visible: true },
      });
    }
    case ACTION_TYPES.CLOSE_MENU: {
      return Object.assign({}, state, {
        menu: { visible: false },
      });
    }
    default:
      return state;
  }
};

export default reducer;

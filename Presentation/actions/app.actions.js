import ACTION_TYPES from './action-types';

export const updateUser = user => {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    user
  };
};
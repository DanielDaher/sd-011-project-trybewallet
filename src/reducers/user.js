// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL } from '../actions';

const initialState = {
  user: {
    email: '',
  },
};

function user(state = initialState, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;

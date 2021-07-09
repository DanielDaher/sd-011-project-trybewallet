// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, SUCCESS_API, ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  erro: null,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case SUCCESS_API:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case ERROR:
    return {
      ...state,
      erro: action.error,
    };
  default:
    return state;
  }
}

export default walletReducer;

// Coloque aqui suas actions
export const userLogin = (payload) => ({
  type: 'USER_LOGIN',
  payload,
});

export const setArrayCurrencie = (payload) => ({
  type: 'SUCESS_FETCH',
  payload,
});

export const setArrayExpenses = (payload) => ({
  type: 'SUCESS_EXPENSES',
  payload,
});

export const fetchCurrencie = () => async (dispath) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const object = await response.json();
  return dispath(setArrayCurrencie(object));
};

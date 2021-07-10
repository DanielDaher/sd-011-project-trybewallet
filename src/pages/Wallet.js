import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiThunk, saveExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { requestApiAction } = this.props;
    await requestApiAction();
    const { currencies } = this.props;
    this.setState({ currency: Object.keys(currencies)[0] })
  }

  handleChange(event) {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  }

  handleId() {
    const { id } = this.state
    this.setState({ id: id + 1 });
  }
  
  createInput(name, label, stateKey) {
    return (
      <label htmlFor={ name }>
        { label }
        <input
          id={ name }
          type="text"
          name={ name }
          onChange={ this.handleChange }
          value={ stateKey }
        />
      </label>
    );
  }

  createSelect(name, label, arraySelect, stateKey) {
    return (
      <label htmlFor={ name }>
        { label }
        <select
          id={ name }
          name={ name }
          onChange={ this.handleChange }
          value={ stateKey }
        >
          { arraySelect.map((item) => (
            <option key={ name } value={ item }>{ item }</option>
          ))}
        </select>
      </label>
    );
  }

  totalExpenses(expenses) {
    const total = expenses.reduce((acc, expense ) => acc + Number(expense.value) * expense.exchangeRates[expense.currency].ask, 0)
    return (Math.round(total * 100)/100)
  }

  renderHeader() {
    const { userEmail, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">{ expenses.length > 0 ? this.totalExpenses(expenses) : 0}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }

  render() {
    const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { id, value, description, currency, method, tag } = this.state;
    const { currencies, loadingCurrencies, addToExpensesAction } = this.props;
    delete currencies.USDT;
    const currenciesArray = Object.keys(currencies).map((item) => item);  

    return (
      <div>
        { this.renderHeader() }
        <h3>TrybeWallet</h3>
        { loadingCurrencies ? <p>Carregando...</p> : (
          <form>
            { this.createInput('value', 'Valor', value) }
            { this.createInput('description', 'Descrição', description) }
            { this.createSelect('currency', 'Moeda', currenciesArray, currency) }
            { this.createSelect('method', 'Método de pagamento', payments, method) }
            { this.createSelect('tag', 'Tag', tags, tag) }
            <button
              type="button"
              onClick={ () => { {
                this.handleId();
                this.fetchCurrencies();
                addToExpensesAction({
                  id,
                  value,
                  description,
                  currency,
                  method,
                  tag,
                  exchangeRates: currencies,
                })
                };
              } }
            >
              Adicionar despesa
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  loadingCurrencies: state.wallet.isLoading,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiAction: () => dispatch(fetchApiThunk()),
  addToExpensesAction: (payload) => dispatch(saveExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = ({
  userEmail: PropTypes.string,
  currencies: PropTypes.shape({ Object }),
  loadingCurrencies: PropTypes.bool,
}).isRequired;

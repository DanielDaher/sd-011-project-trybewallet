import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  expenses,
  description,
  currency,
  paymentMethod,
  category,
} from '../walletComponents/walletElements';
import { fetchCurrencies, fetchToExpenses } from '../actions';
import ExpenseTableHeader from '../walletComponents/ExpenseTableHeader';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    };

    this.handlerInputChange = this.handlerInputChange.bind(this);
    this.addExpenseToGlobal = this.addExpenseToGlobal.bind(this);
    this.sumTotalOfExpenses = this.sumTotalOfExpenses.bind(this);
  }

  componentDidMount() {
    const { request } = this.props;
    request();
  }

  handlerInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  addExpenseToGlobal() {
    const { requestExpenses, userExpense } = this.props;
    let id = 0;
    if (userExpense.length > 0) {
      id = userExpense[userExpense.length - 1].id + 1;
    }

    requestExpenses({ ...this.state, id });
  }

  sumTotalOfExpenses() {
    const { userExpense } = this.props;

    let total = 0;

    userExpense.forEach((expense) => {
      const { exchangeRates } = expense;

      const conversionRate = {
        userValueInput: Number(expense.value),
        currValueOfCurrency: Number(exchangeRates[expense.currency].ask),
      };

      const { userValueInput, currValueOfCurrency } = conversionRate;
      const num = userValueInput * currValueOfCurrency;
      total += num;
    });
    return total;
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div className="main-page">
        <section>
          <div className="title">TrybeWallet</div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            { this.sumTotalOfExpenses() }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <form>
          {expenses(this.handlerInputChange)}
          {description(this.handlerInputChange)}
          {currency(currencies, this.handlerInputChange)}
          {paymentMethod(this.handlerInputChange)}
          {category(this.handlerInputChange)}
          <button
            type="button"
            className="add-expense"
            onClick={ () => this.addExpenseToGlobal() }
          >
            Adicionar despesa
          </button>
        </form>
        {/* Para relembrar o uso de tabelas, consulsei um pequeno artigo em...
        Source: http://www.linhadecodigo.com.br/artigo/3439/introducao-ao-html-usando-tabelas-em-html.aspx */}
        <ExpenseTableHeader />
        <table className="expenses-body" border="1">
          {this.props.userExpense.map((expense) => (
            <thead key={ expense.id }>
              <td name="description">{expense.description}</td>
              <td name="tag">{expense.tag}</td>
              <td name="payment-method">{expense.method}</td>
              <td name="value">{expense.value}</td>
              <td name="currency">{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
              <td name="exchange-used">{(expense.exchangeRates[expense.currency].ask * 1).toFixed(2)}</td>
              <td name="converted-value">{(expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2)}</td>
              <td name="conversion-currency">Real</td>
            </thead>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  userExpense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  request: () => dispatch(fetchCurrencies()),
  requestExpenses: (forms) => dispatch(fetchToExpenses(forms)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  userExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestExpenses: PropTypes.func.isRequired,
};

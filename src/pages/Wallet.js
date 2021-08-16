import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { fetchApi } from '../actions';
import '../CSS/Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.totalSpent = this.totalSpent.bind(this);
  }

  componentDidMount() {
    fetchApi();
  }

  totalSpent() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header className="wallet-header">
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`Despesa total: ${this.totalSpent()}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <Form />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);

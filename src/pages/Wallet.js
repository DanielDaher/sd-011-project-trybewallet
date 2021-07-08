import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">Despesa total: 0</span>
        <span data-testid="header-currency-field">Câmbio: BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

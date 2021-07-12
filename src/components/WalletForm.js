import React, { Component } from 'react';

export default class WalletForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="valor"
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="Descrição"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency">
            <option>nenhuma</option>
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}
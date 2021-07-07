import React, { Component } from 'react';

export default class WalletForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            name="valor"
            type="number"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            name="descricao"
            type="string"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select>
            <option value="test">Teste</option>
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de pagamento:
          <select>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-de-credito">Cartão de crédito</option>
            <option value="cartao-de-debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Tag:
          <select>
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

import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChange, name, value } = this.props;
    return (
      <div>
        <label className="form-wallet-label" htmlFor={ name }>
          { name }
          <input
            className="form-wallet-input-field"
            type="text"
            name={ name }
            id={ name }
            value={ value }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputText;

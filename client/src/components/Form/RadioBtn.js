import React from "react";
import PropTypes from 'prop-types';

class RadioBtn extends React.Component {
// Destructuring the type, className, children and onClick props, applying them to the button element

  render () {
    
    const { children, value, checked } = this.props


    return (
        <label className = "checkBox">
          <input name = "sharable" type="radio" value={ value } checked={checked} />
          { children }
        </label>
    )
  }
}

RadioBtn.props = {
  name: PropTypes.string,
  placeholder: PropTypes.string
}

export default RadioBtn

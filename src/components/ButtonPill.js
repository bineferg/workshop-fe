import React from 'react';
import { Link } from 'react-router-dom'

/**
 *   */
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {label: props.label}
  }


  render() {
	  return (
	    <a className="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib near-black">{this.props.label}</a>
		 );
  }
}

export default Button;

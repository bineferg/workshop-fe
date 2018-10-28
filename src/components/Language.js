import React from 'react';
import PropTypes from 'prop-types';

class Language extends React.Component {

  constructor() {
    super();
    this.getLang = this.getLang.bind(this);
    this.setLang = this.setLang.bind(this);
    this.state = {currentLang: "de"}
  }

  getLang(){
    return this.state.currentLang;
  }

  setLang(lang) {
    this.setState({
      currentLang: lang
    })
  }
  render(){
    return (
    <div></div>
  )
  }

}
export default Language;

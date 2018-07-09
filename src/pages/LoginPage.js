import React from 'react';
import PropTypes from 'prop-types';
import wkimg from '../assets/background.bluegreen.jpg';


class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
  }

  login(){
   this.props.auth.login();
  }
  render(){
    return(
      <div>
      <center>
        <h1 className="f3 f2-m f1-l fw2 black-90 mt10">
          Login to AdminCenter
        </h1>
        <img className="mt0 mb4 vh-50" src={wkimg}/>

      </center>
      <center className="mb4">
      <a class="f6 link dim br2 ph4s pointer pv2 mb2 dib white bg-dark-blue" onClick={this.login}>Login</a>
      </center>

      </div>
    );

  }

}
LoginPage.propTypes = {
	 auth: PropTypes.object,
	 children: PropTypes.node
};
export default LoginPage;

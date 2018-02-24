import React from 'react';
import ReactFormLabel from '../components/ReactFormLabel.js';
import PropTypes from 'prop-types';
import ButtonPill from '../components/ButtonPill.js';


const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/signup/"

class RegisterForm extends React.Component {
constructor() {
  super();

  this.state = {
   firstName: '',
   lastName:'',
   email: ''
  }
 }

handleChange = (e) => {
 let newState = {};

 newState[e.target.name] = e.target.value;

 this.setState(newState);
};


handleSubmit = (e, message) => {
 e.preventDefault();
 var payload = {
  FirstName: this.state.firstName,
  LastName: this.state.lastName,
  Email: this.state.email,
 }
 console.log(payload)

 console.log(this.props.id);
	var url = backendURL+this.props.id;
	fetch(url, {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload)
		}).then((response) => {
  			if (response.ok) {
				this.setState({registerSuccess: true})
  			}
		}).catch (function (error) {
			console.log('Request failed', error);
			return;
		});

 this.setState({
  firstName:'',
  lastName:'',
  email: '',
 });
};

render() {
  
 if(this.state.registerSuccess){
	return <h3>Thanks!</h3>;
 }

 if(this.props.isFull){
    return(
        <p>Sorry this workshop is full</p>
       )
 }

 return(
 <form onSubmit={this.handleSubmit} className="pa4 black-80">
 <div className="measure center">
  <label className="f6 db mb2">First Name
  <input id="firstName" name="firstName" className="ba b--black-20 pa2 mb2 db w-100" type="text"  required onChange={this.handleChange} value={this.state.firstName} /></label>
  <label className="f6 db mb2">Last Name
  <input id="lastName" name="lastName" className="ba b--black-20 pa2 mb2 db w-100" type="text" required onChange={this.handleChange} value={this.state.lastName} /></label>
  <label className="f6 db mb2">Email
  <input id="email" name="email" className="ba b--black-20 pa2 mb2 db w-100" type="email" required onChange={this.handleChange} value={this.state.email} /></label>
    <label className="f6 db mb2">Special Accommodations <span className="normal black-60">(optional)</span></label>
    <textarea id="comment" name="comment" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
    <small id="comment-desc" className="f6 black-60">Please let us know if you need special accessibility accommodations. </small>
  <div>
   <input className="ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" />
  </div>
  </div>
 </form>
 )
}

}

RegisterForm.propTypes = {
	 id: PropTypes.string,
	 isFull: PropTypes.bool,
	 children: PropTypes.node
};

export default RegisterForm;

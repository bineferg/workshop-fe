import React from 'react';
import PropTypes from 'prop-types';
import logoBW from '../assets/logo-black-white.jpg';
import { Icon, Form, Input} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const mailURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/mail"
const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/signup"

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
 var msg = "For Workshop: "+ this.props.name+ "\n Comment: "+ this.state.comments
 var payload = {
  FirstName: this.state.firstName,
  LastName: this.state.lastName,
  Email: this.state.email,
  Message: msg,
 }

	fetch(mailURL, {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload)
		}).then((response) => {
  			if (response.ok) {
          fetch(backendURL + '/' + this.props.id, {
            method: 'POST',
            headers: {
      		      'Accept': 'application/json',
      		      'Content-Type': 'application/json',
      		  },
            body: JSON.stringify(payload)
          }).then((response) => {
        			if (response.ok) {
      				      this.setState({registerSuccess: true})
                    return
        			}
      		})
          .catch(function(error){
            console.log('Request failed', error);
            return;
          });
  			}
		}).catch (function (error) {
			console.log('Request failed', error);
			return;
		});

 this.setState({
  firstName:'',
  lastName:'',
  email: '',
  comments:'',
 });
};

render() {

 if(this.state.registerSuccess){
	return (
    <div>
    <img className="tc vh-50 db mb0 ml5" src={logoBW} ></img>
    <p className="f3 fw1 lh-title tc">
    Thanks for signing up!</p>
    <p className="f5 fw1 lh-title tc">
     For paid events, please bring cash with you to your workshop and we
    look forward to seeing you. </p>
    </div>
  );
 }

 if(this.props.isFull){
    return(
        <p>Sorry this workshop is full</p>
       )
 }

 return(
 <Form layout={"vertical"} onSubmit={this.handleSubmit} className="black-80">
   <div className="measure center dib w-100 ">
     <div className="f6 db ml3">
       <FormItem label="First Name" required="true" >
         <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} name="firstName" placeholder="First Name" required="true" onChange={this.handleChange} />
       </FormItem>
     </div>
     <div className="f6 db ml3">
       <FormItem label="Last Name" required="true">
         <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} name="lastName" placeholder="Last Name" required="true" onChange={this.handleChange}/>
       </FormItem>
     </div>
     <div className="f6 db ml3">
       <FormItem label="E-Mail" required="true">
         <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)'}} />} name="email" placeholder="E-Mail" type="email" required="true" onChange={this.handleChange}/>
       </FormItem>
     </div>
     <div className="f6 db ml3">
       <FormItem label="Special Requests" name="comments">
           <TextArea placeholder="Please let us know any of special accommodations. (Optional)" autosize={{ minRows: 4, maxRows: 100 }} onChange={this.handleChange} name="comments"/>
       </FormItem>
     </div>
     <div>
       <input className="f6 grow plr3 no-underline br-pill fr ph3 pv2 dib bg-white" type="submit" />
     </div>
   </div>
   </Form>
 )
}

}

RegisterForm.propTypes = {
	 id: PropTypes.string,
   name: PropTypes.string,
	 isFull: PropTypes.bool,
	 children: PropTypes.node
};

export default RegisterForm;

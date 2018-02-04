import React from 'react';
import ReactFormLabel from '../components/ReactFormLabel.js';

class CreateEventForm extends React.Component {
constructor() {
  super();

  this.state = {
   name: '',
   email: '',
   message: ''
  }
 }

handleChange = (e) => {
 let newState = {};

 newState[e.target.name] = e.target.value;

 this.setState(newState);
};


handleSubmit = (e, message) => {
 e.preventDefault();

 var formData = {
  formSender: this.state.name,
  formEmail: this.state.email,
  formMessage: this.state.message
 }

 console.log(formData.formMessage);
 if (formData.formSender="" || formData.formEmail=="" || formData.formSubject=="" || formData.formMessage=="") {
  	
	return false;
 }
 /*$.ajax({
  url: 'http://www.example.com',
  dataType: 'json',
  type: 'POST',
  data: formData,
  success: function(data) {
   if (confirm('Thank you for your message. Can I erase the form?')) {
    document.querySelector('.form-input').val('');
   }
  },
  error: function(xhr, status, err) {
   console.error(status, err.toString());
   alert('There was some problem with sending your message.');
  }
 });*/
 
 this.setState({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
 });
};

render() {
 return(
 <form onSubmit={this.handleSubmit}>
  <h1>Create Workshop</h1>

  <fieldset>
   <ReactFormLabel htmlFor='formName' title='Event Name:' />

   <input id='formName' className='form-input' name='name' type='text' required onChange={this.handleChange} value={this.state.name} />
  </fieldset>
  <fieldset>
   <ReactFormLabel htmlFor='formMessage' title='Description:' />

   <textarea id='formDescription' className='form-textarea' name='message' required onChange={this.handleChange} value={this.state.description}></textarea>
  </fieldset>

  <fieldset>
   <ReactFormLabel htmlFor='formCost' title='Cost:' />

   <input id='formcost' className='form-input' name='cost' type='cost' required onChange={this.handleChange} value={this.state.cost} />
  </fieldset>
  <fieldset>
   <ReactFormLabel htmlFor='formLocation' title='Location:' />

   <input id='formLocation' className='form-input' name='location' type='location' required onChange={this.handleChange} value={this.state.loc} />
  </fieldset>
  <fieldset>
   <ReactFormLabel htmlFor='formDate' title='Date:' />

   <input id='formDate' className='form-input' name='date' type='date' required onChange={this.handleChange} value={this.state.date} />
  </fieldset>
  <fieldset>
   <ReactFormLabel htmlFor='formTime' title='Time:' />

   <input id='formTime' className='form-input' name='time' type='time' required onChange={this.handleChange} value={this.state.time} />
  </fieldset>


  <div>
   <input id='formButton' className='btn' type='submit' placeholder='Send message' />
  </div>
 </form>
 )
}



}

export default CreateEventForm;

import React from 'react';
import history from '../components/history.js';

class ContactUsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.push('/contact')
 }
 handleChange = (e) => {
  let newState = {};

  newState[e.target.name] = e.target.value;

  this.setState(newState);
 };

 render(){
   return (
     <div>
     <h1 className="f3 fw1 mt2 lh-title tc"> Contact Us</h1>
      <form onSubmit={this.handleSubmit} className="pa4 black-80">
      <div className="measure center">
       <label className="f6 db mb2">First Name
       <input id="firstName" name="firstName" className="ba b--black-20 pa2 mb2 db w-100" type="text"  required onChange={this.handleChange} value={this.state.firstName} /></label>
       <label className="f6 db mb2">Last Name
       <input id="lastName" name="lastName" className="ba b--black-20 pa2 mb2 db w-100" type="text" required onChange={this.handleChange} value={this.state.lastName} /></label>
       <label className="f6 db mb2">Email
       <input id="email" name="email" className="ba b--black-20 pa2 mb2 db w-100" type="email" required onChange={this.handleChange} value={this.state.email} /></label>
         <label className="f6 db mb2">Message </label>
         <textarea id="comment" name="comment" className="db border-box hover-black w-100 measure-cb measure-cbh ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
         <small id="comment-desc" className="f6 black-60">Please let us know in a brief message what we can help with. </small>
       <div>
        <input className="ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" />
       </div>
       </div>
      </form>
      </div>
   );


 }


 }
 export default ContactUsPage;

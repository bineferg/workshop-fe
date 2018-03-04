import React from 'react';
import history from '../components/history.js';
import tableLamp from '../assets/table-lamp.jpg';
import ErrPage from '../pages/ErrPage.js';

const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/mail"

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

 handleSubmit = (e, comment) => {
  e.preventDefault();
  var payload = {
   FirstName: this.state.firstName,
   LastName: this.state.lastName,
   Email: this.state.email,
   Message: this.state.comment,
  }

  var url = backendURL
  fetch(url, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
    }).then((response) => {
        if (response.ok) {
        this.setState({submitSuccess: true})
        }
    }).catch(error => this.setState({ err: true}));


  this.setState({
   firstName:'',
   lastName:'',
   email: '',
   comment:'',
  });
 };


 render(){
   if(this.state.err){
     return (<ErrPage/>);
   }
   if(this.state.submitSuccess) {
     return(
       <article className="bg-white cf">
         <div className="vh-75 cover mt7 bg-center" style={{backgroundImage: `url(${tableLamp})`}}></div>
         <p className="tc f2 mb4 fw1 avenir ">Contact Us </p>
         <div className="fl w-67 bg-near-white pb3 vh-100">
           <h1 className="plr5 f2 mb4 fw1 avenir mt10 ">Thanks for your inquiry, we will get back to you shortly!</h1>
         </div>
         <div className="fl w-33 pb5 dib vh-100 bg-light-gray tc">
           <h1 className="plr5 f3 mt10 fw3 avenir">Location</h1>
           <p className="mb4">Forster Strasse 51 <br></br> 10997, Berlin</p>
           <h1 className="plr5 f3 fw3 avenir">Phone</h1>
           <p className="mb4">T: (1) 234-352-4356</p>
           <h1 className="plr5 f3 fw3 avenir">Social</h1>
           <a className="link tc pr2" href="http://instagram.com">
           <img src="./insta.png" class="foot-icon dib"></img></a>
           <a className="link tc" href="https://www.facebook.com/theworkshoponfoster/">
             <img src="./fb.png" class="foot-icon dib"></img></a>

           </div>
        </article>
     );
   }
   return (
   <article className="bg-white cf">
     <div className="vh-75 cover mt7 bg-center" style={{backgroundImage: `url(${tableLamp})`}}></div>
     <p className="tc f2 mb4 fw1 avenir ">Contact Us </p>
     <div className="fl w-67 bg-near-white"></div>

  <div className="fl w-67 bg-near-white">
    <h1 className="plr5 f2 mb4 fw1 avenir">Get in Touch</h1>
     <div className="pa5 dark-gray">
    <form onSubmit={this.handleSubmit} className="black-80">
     <label className="f6 db mb2">First Name
     <input id="firstName" name="firstName" className="ba b--black-20 pa2 mb2 db w-80" type="text"  required onChange={this.handleChange} value={this.state.firstName} /></label>
     <label className="f6 db mb2">Last Name
     <input id="lastName" name="lastName" className="ba b--black-20 pa2 mb2 db w-80" type="text" required onChange={this.handleChange} value={this.state.lastName} /></label>
     <label className="f6 db mb2">Email
     <input id="email" name="email" className="ba b--black-20 pa2 mb2 db w-80" type="email" required onChange={this.handleChange} value={this.state.email} /></label>
       <label className="f6 db mb2">Message </label>
       <textarea id="comment" name="comment" className="db border-box hover-black w-80 measure-cb measure-cbh ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" onChange={this.handleChange} value={this.state.message}></textarea>
       <small id="comment-desc" className="f6 black-60">Please let us know in a brief message what we can help with. </small>
       <div>
      <input className="ph3 pv2 input-reset ba b--black bg-white grow pointer f6 dib" type="submit" />
      </div>
    </form>
    </div>
  </div>
  <div className="fl w-33 pb5 dib vh-100 bg-light-gray tc">
    <h1 className="plr5 f3 mt10 fw3 avenir">Location</h1>
    <p className="mb4">Forster Strasse 51 <br></br> 10997, Berlin</p>
    <h1 className="plr5 f3 fw3 avenir">Phone</h1>
    <p className="mb4">T: (1) 234-352-4356</p>
    <h1 className="plr5 f3 fw3 avenir">Social</h1>
    <a className="link tc pr2" href="http://instagram.com">
    <img src="./insta.png" class="foot-icon dib"></img></a>
    <a className="link tc" href="https://www.facebook.com/theworkshoponfoster/">
      <img src="./fb.png" class="foot-icon dib"></img></a>

    </div>
   </article>
   );
 }


 }
 export default ContactUsPage;

import React from 'react';
import history from '../components/history.js';
import tableLamp from '../assets/table-lamp.jpg';
import ErrPage from '../pages/ErrPage.js';
import { DatePicker, Icon, Form, Input, TimePicker, Checkbox } from 'antd';

const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/mail"
const FormItem = Form.Item;
const { TextArea } = Input;
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
         <div className="vh-75 cover mt5s bg-center" style={{backgroundImage: `url(${tableLamp})`}}></div>
         <p className="tc f2 mb4 fw1 avenir ">Contact Us </p>
         <div className="fl w-67 bg-near-white pb3 vh-100">
           <h1 className="plr5 f2 mb4 fw1 avenir mt10">Thanks for your inquiry, we will get back to you shortly!</h1>
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
     <div className="vh-75 cover mt5s bg-center" style={{backgroundImage: `url(${tableLamp})`}}></div>
     <p className="tc f2 mb4 mt5 fw1 avenir ">Contact Us </p>
     

  <div className="fl w-67 h-100 bg-near-white">
    <h1 className="f2 mt4 fw1 avenir pl10">Get in Touch</h1>
     <div className="dark-gray plr5">
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
           <FormItem label="Message" name="comments">
               <TextArea placeholder="..." autosize={{ minRows: 8, maxRows: 100 }} onChange={this.handleChange} name="comments"/>
           </FormItem>
         </div>
         <div>
           <input className="f6 grow plr3 no-underline br-pill fr ph3 pv2 dib bg-white" type="submit" />
         </div>
       </div>
       </Form>
    </div>
  </div>
  <div className="fl w-33 dib h-100 bg-light-gray tc">
    <p className="plr5 f3 mt10 fw3 avenir">Location</p>
    <p className="mb4">Forster Strasse 51 <br></br> 10997, Berlin</p>
    <p className="plr5 f3 fw3 avenir">Phone</p>
    <p className="mb4">T: +49 176 61551591</p>
    <p className="plr5 f3 fw3 avenir">Social</p>
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

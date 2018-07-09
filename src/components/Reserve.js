import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Icon, Form, Input, TimePicker, Checkbox } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import ErrPage from '../pages/ErrPage.js';


const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/mail"

const FormItem = Form.Item;
const { TextArea } = Input;

class Reserve extends React.Component {
  constructor(props){
    super(props);
    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePUDateChange = this.handlePUDateChange.bind(this);
    this.handlePUTimeChange = this.handlePUTimeChange.bind(this);
    this.handleDODateChange = this.handleDODateChange.bind(this);
    this.handleDOTimeChange = this.handleDOTimeChange.bind(this);

  }
  handleChange = (e) => {
   let newState = {};
   newState[e.target.name] = e.target.value;
   this.setState(newState);
  };

  handlePUDateChange(date, datestring) {
    this.setState({pickupDate : datestring})

  }
  handlePUTimeChange(time, timestring){
    this.setState({pickupTime: timestring})

  }
  handleDODateChange(date, datestring) {
    this.setState({dropoffDate: datestring})
  }
  handleDOTimeChange(time, timestring) {
    this.setState({dropoffTime: timestring})
  }

  handleSubmit(e){
    e.preventDefault();

    var msg = "Rental Inquiry: "+ this.props.location.state.name + "\n Details: "+ this.state.comments
              +"\n Pickup: "+this.state.pickupDate+" "+this.state.pickupTime +
              "\n Drop Off: "+this.state.dropoffDate + " "+ this.state.dropoffTime+"\n";
    var payload = {
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        Email: this.state.email,
        Message: msg,
    }

    var url = backendURL;
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
     }).catch (function (error) {
       console.log('Request failed', error);
       return;
     });

  this.setState({
   firstName:'',
   lastName:'',
   email: '',
   comments:'',
   pickupTime:'',
   pickupDate:'',
   dropoffTime:'',
   dropoffDate:''
  });

}



render() {
  const format = 'HH:mm';

  if(this.state.err){
    return (<ErrPage/>);
  }
  if(this.state.submitSuccess) {
    return(
    <div>
      <div className="mt10 pb5 mw9">
        <img src={this.props.location.state.img} className="db center mb5 gearImg"></img>
          <h2 className="avenir fw1 f1-5 mb0 db plr5 cf tc">{this.props.location.state.name}</h2>
          <p className="avenir fw1 f2 mb2 db plr5 cf tc">{this.props.location.state.price}</p>
            <p className="pb5 plr5 f5 lh-copy db center measure-cb avenir">{this.props.location.state.description}</p>
      </div>
      <article className="bg-white cf">
        <div className="fl w-100 pb10 bg-near-white">
          <h1 className="plr5 f2 mb4 tc fw1 avenir mt10">Thanks for your inquiry, we will get back to you shortly!</h1>
        </div>
      </article>
    </div>
  );
  }

  return(
    <div>
      <div className="mt10 pb5 mw9">
        <img src={this.props.location.state.img} className="db center mb5 gearImg"></img>
          <h2 className="avenir fw1 f1-5 mb0 db plr5 cf tc">{this.props.location.state.name}</h2>
          <h3 className="avenir fw1 f2 mb2 db plr5 cf tc">{this.props.location.state.price}</h3>
            <p className="pb5 plr5 f5 lh-copy db center measure-cb avenir">{this.props.location.state.description}</p>
      </div>
      <article className="bg-white cf">
        <div className="fl w-100 bg-near-white">
          <h1 className="f2 mb4 fw1 pl10 avenir">Rental Inquiry</h1>
          <div className="pa5 dark-gray">
          <Form layout={"vertical"} onSubmit={this.handleSubmit} className="pa4 black-80">
            <div className="fl w-50">
              <div className="f6 mb2 mr5">
                <FormItem label="First Name" required="true" >
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} name="firstName" placeholder="First Name" required="true" onChange={this.handleChange} />
                </FormItem>
              </div>
              <div className="f6 mb2 mr5">
                <FormItem label="Last Name" required="true">
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} name="lastName" placeholder="Last Name" required="true" onChange={this.handleChange}/>
                </FormItem>
              </div>
              <div className="f6 mb2 mr5">
                <FormItem label="E-Mail" required="true">
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)'}} />} name="email" placeholder="E-Mail" type="email" required="true" onChange={this.handleChange}/>
                </FormItem>
              </div>
              <div className="mr5">
                <FormItem label="Special Requests" name="comments">
                    <TextArea placeholder="Please let us know any of special accommodations. (Optional)" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="comments"/>
                </FormItem>
              </div>
            </div>
            <div className="fl w-50 vh-100">
              <div className="flex">
                <FormItem label="Pickup Date" className="mr3" required="true">
                  <DatePicker onChange={this.handlePUDateChange} type="datetime" required="true"/>
                </FormItem>
                <FormItem label="Pickup Time" required="true">
                  <TimePicker onChange={this.handlePUTimeChange} defaultValue={moment('00:00', format)} format={format} required="true" />
                </FormItem>
              </div>
              <div className="flex">
                <FormItem label="Dropoff Date" className="mr3" required="true">
                  <DatePicker onChange={this.handleDODateChange}/>
                </FormItem>
                <FormItem label="Dropoff Time" required="true">
                  <TimePicker onChange={this.handleDOTimeChange} defaultValue={moment('00:00', format)} format={format} />
                </FormItem>
              </div>
              <div>
              <FormItem>
              <Checkbox required="true"> I agree that I am responsible for returning rental items in the same condition in which they were received, except for ordinary wear and tear. I am liable for the replacement cost of any damaged or lost items.</Checkbox>
              </FormItem>
              </div>
            <div>
              <input className="f6 grow plr3 no-underline br-pill fr ph3 pv2 mb2 mr6 mt4 dib bg-white" type="submit" />
            </div>
          </div>
        </Form>
      </div>
    </div>
    </article>

    </div>
  );
  }
}
Reserve.propTypes = {
	 id: PropTypes.string,
   name: PropTypes.string,
	 img: PropTypes.string,
   price: PropTypes.string,
   description: PropTypes.string,
	 children: PropTypes.node
};

export default Reserve;

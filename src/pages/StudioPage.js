import React from 'react';
import history from '../components/history.js';
import tableLamp from '../assets/wrk19.jpg';
import ErrPage from '../pages/ErrPage.js';
import { DatePicker, Icon, Form, Input, TimePicker, Checkbox } from 'antd';

const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/mail"
const FormItem = Form.Item;
const { TextArea } = Input;
class StudioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.push('/studio')
 }
 onClick(){
   history.push('contact')
 }


 render(){
   return (
   <article className="bg-white cf">
     <div className="vh-75 cover mt5 bg-center" style={{backgroundImage: `url(${tableLamp})`}}></div>
     <p className="tc f2 mb4 fw1 avenir ">The Workshop Studio</p>
     <div className="fl w-67 bg-near-white"></div>

  <div className="fl w-67 bg-near-white">
    <h1 className="plr5 f2 mb4 fw1 avenir">Equipment and Gear</h1>
     <div className="pa5 dark-gray">
     <p>The Workshop offers studio space for rent.</p>
     <p>Equipment you will find there includes: </p>
      <ul>
        <li> 2 Pioneer CDJ 2000 Nexus </li>
        <li> Pioneer DJM 600 Mixer</li>
        <li> Pioneer DJM 750 Mixer</li>
        <li> Pioneer DJM 900 Nexus Mixer</li>
        <li> Allen and Heath Zed 14 Mixer </li>
        <li> M-Audio Trigger Finger Pro </li>
        <li> Native Instruments Traktor Kontroll S2 </li>
        <li> JustIn Cubus 21 (Sub+Satellite Units) </li>
        <li> Native Instruments Maschine Studio Groove Production Studio </li>
        <li> Native Instruments Komplete Audio 6 </li>
        <li> Doepfer Dark Energy Synthesizer </li>
        <li> Doepfer Dark Time Sequencer </li>
        <li> 2 Technics SL-1210 Mk2 Turntables </li>
        <li> AKAI GX 620 </li>
        <li> Foster Multitrack X-14 </li>
        <li> Shure B58 and two other microphones </li>
      </ul>
      <p> All cables and adaptors for the gear listed above are available in the space. To sign up for studio time
      <span onClick={this.onClick} className="cursor link blue"> get in touch </span> with us! </p>
      <p>*Please note this is a shared space, please be mindful of other artists when setting up and packing up.*</p>
    </div>
  </div>
  <div className="fl w-33 pb6 dib vh-100 bg-light-gray tc">
    <h1 className="plr5 f3 mt5 fw3 avenir">10 Hrs per Week</h1>
    <p className="mb2">40€ per Month</p>
    <h1 className="plr5 f3 mt5 fw3 avenir">25 Hrs per Week</h1>
    <p className="mb2">60€ per Month</p>
    <h1 className="plr5 f3 mt5 fw3 avenir">Unlimitted Studio Time</h1>
    <p className="mb2">90€ per Month</p>
    <h1 className="plr5 f3 mt5 fw3 avenir">Already a member?</h1>
    <p className="mb2 plr3">Please schedule your time with our shared calendar, feel free to
    <span onClick={this.onClick} className="cursor link blue"> contact us </span> should you run into any issues</p>


    </div>
   </article>
   );
 }


 }
 export default StudioPage;

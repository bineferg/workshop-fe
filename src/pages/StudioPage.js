import React from 'react';
import history from '../components/history.js';
import studio from '../assets/wrk19.jpg';
import wrkshp from '../assets/wrk10.jpg';
import beamer from '../assets/beamer.jpg';
import ErrPage from '../pages/ErrPage.js';
import { DatePicker, Icon, Form, Input, TimePicker, Checkbox, Carousel } from 'antd';

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
   <Carousel className="vh-75 cover mt5 bg-center">
    <div><div className="h-100 cover bg-center" style={{backgroundImage: `url(${studio})`}}></div></div>
    <div><div className="h-100 cover bg-center" style={{backgroundImage: `url(${wrkshp})`}}></div></div>
    <div><div className="h-100 bg-center" style={{backgroundImage: `url(${beamer})`}}></div></div>
  </Carousel>

     <p className="tc f2 mb4 fw1 avenir mt5">The Workshop Spaces</p>
  <div className="cf col">
  <div className="fl w-67 bg-near-white">
  <div className="mb4 ">
    <h1 className="pl10 f2 fw1 avenir mt5">Sudio Space</h1>
     <div className="plr5">
      <div className="overflow-auto">
      <table className="f6 w-100 center" cellspacing="0">
      <tbody className="lh-copy">
       <tr>
       <td className="pv3 pl3 bb b--black-20">2 Pioneer CDJ 2000 Nexus</td>
       <td className="pv3 pl3 bb b--black-20">Pioneer DJM 600 Mixer</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Pioneer DJM 750 Mixer</td>
       <td className="pv3 pl3 bb b--black-20">Pioneer DJM 900 Nexus Mixer</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Allen and Heath Zed 14 Mixer</td>
       <td className="pv3 pl3 bb b--black-20">M-Audio Trigger Finger Pro</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Native Instruments Traktor Kontroll S2</td>
       <td className="pv3 pl3 bb b--black-20">JustIn Cubus 21 (Sub+Satellite Units)</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Native Instruments Maschine Studio Groove Production Studio</td>
       <td className="pv3 pl3 bb b--black-20">Native Instruments Komplete Audio 6</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Doepfer Dark Energy Synthesizer</td>
       <td className="pv3 pl3 bb b--black-20">Doepfer Dark Time Sequencer</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">2 Technics SL-1210 Mk2 Turntables</td>
       <td className="pv3 pl3 bb b--black-20">AKAI GX 620</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Foster Multitrack X-14</td>
       <td className="pv3 pl3 bb b--black-20">Shure B58 and two other microphones</td>
       </tr>
       </tbody>
      </table>
      </div>
      </div>
      <p className="plr5"> All gear, as well as cables and adaptors for the gear listed above are available in the space. To sign up for studio time
      <span onClick={this.onClick} className="cursor link blue"> get in touch </span> with us! </p>
      <p className="plr5">*Please note this is a shared space, please be mindful of other artists when setting up and packing up.</p>
      </div>
      <h1 className="pl10 f2 fw1 avenir mt5">Working Space</h1>
      <div className="plr5">
       <div className="overflow-auto">
      <table className="f6 w-100 center" cellspacing="0">
      <tbody className="lh-copy">
       <tr>
       <td className="pv3 pl3 bb b--black-20">Workspace Tables</td>
       <td className="pv3 pl3 bb b--black-20">Tools for DIY projects</td>
       </tr>
       <tr>
       <td className="pv3 pl3 bb b--black-20">Beamer</td>
       <td className="pv3 pl3 bb b--black-20">Projector Screen</td>
       </tr>
       </tbody>
      </table>
      </div>
      </div>
      <p className="plr5"> The workshop offers co-working spaces for collaborative work. To reserve workshoping space
      <span onClick={this.onClick} className="cursor link blue"> get in touch </span> with us! </p>
      <p className="plr5">*Please note this is a shared space, please be mindful of others when setting up and packing up.</p>
  </div>
  <div className="fl w-33 bg-light-gray tc">
  <div className="mt10">
    <h1 className="plr5 f3 mt5 fw3 avenir">10 Hrs per Month</h1>
    <p className="mb2">40€ per Month</p>
    <h1 className="plr5 f3 mt5 fw3 avenir">25 Hrs per Month</h1>
    <p className="mb2">60€ per Month</p>
    <h1 className="plr5 f3 mt5 fw3 avenir">Unlimitted Studio Time</h1>
    <p className="mb2">90€ per Month</p>
    <h1 className="plr5 f3 mt5 fw3 avenir">Already a member?</h1>
    <p className="mb2 plr3">Please schedule your time with our shared calendar, feel free to
    <span onClick={this.onClick} className="cursor link blue"> contact us </span> should you run into any issues</p>

    </div>
    </div>
    </div>
   </article>
   );
 }


 }
 export default StudioPage;

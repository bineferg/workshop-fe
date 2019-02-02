import React from 'react';
import history from '../components/history.js';
import studio from '../assets/wrk19.jpg';
import wkspace from '../assets/wk-space.jpg';
import wrkshp from '../assets/wrk10.jpg';
import tblwrk from '../assets/wrk15.jpg';
import beamer from '../assets/beamer.jpg';
import ErrPage from '../pages/ErrPage.js';
import studiogear from '../assets/studio-gear.jpg'
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
  <div className="mb4 mt3">
  <p className="plr5 pv4 f3 fw1 mw7">  The Workshop offers fully equipped spaces for collaborative and independent projects for rent.</p>

  <div className="cf center mb4">
  <center>
          <div className="fl w-25 w-25-m w-25-l pl5">
            <div className="pv5-s cover bg-center" style={{background: `url(${studiogear})`}}></div>
          </div>
          <div className="fl w-25 w-25-m w-25-l pl2">
            <div className="pv5-s cover bg-center" style={{background: `url(${tblwrk})`}}></div>
          </div>
          <div className="fl w-25 w-25-m w-25-l pl2">
            <div className="pv5-s cover bg-center" style={{background: `url(${wkspace})`}}></div>
          </div>
     </center>
    </div>
    <div className="pl6 cf">
    <p className="fw3 f4-m f3-l pl4-s">Available gear and tools</p>
    <div className="w-25 w-50-ns fl">
      <p className="fw1 f4-m f5-l lh-copy measure mt0">
      <ul>Workspace Tables</ul>
      <ul>Beamer</ul>
      <ul>2 Pioneer CDJ 2000</ul>
      <ul> Nexus	Pioneer DJM 600 Mixer</ul>
      <ul>Pioneer DJM 750 Mixer</ul>
      <ul>Pioneer DJM 900 Nexus Mixer</ul>
      <ul>Allen and Heath Zed 14 Mixer</ul>
      <ul>M-Audio Trigger Finger Pro</ul>
      <ul>  Native Instruments Traktor Kontroll S2</ul>
      <ul>  2 Technics SL-1210 Mk2 Turntables	AKAI GX 620</ul>
      </p>
    </div>
    <div className="w-25 w-50-ns fl">
      <p className="fw1 f4-m f5-l lh-copy measure mt0">
      <ul> Projector Screen</ul>
      <ul> Sautering Tools </ul>
      <ul>  JustIn Cubus 21 (Sub+Satellite Units)</ul>
      <ul>  Native Instruments Maschine Studio Groove Production Studio </ul>
      <ul>  Native Instruments, Komplete Audio 6</ul>
      <ul>  Doepfer Dark Energy Synthesizer</ul>
      <ul>  Doepfer Dark Time Sequencer</ul>
      <ul>  Foster Multitrack X-14	</ul>
      <ul>  Shure B58 and two other microphones</ul>
      </p>
    </div>
  </div>

  </div>

  </div>
  <div className="fl w-33 bg-light-gray tc">
    <div className="mt7">
    <h1 className="plr5 f3 mt5 mb2 fw3 avenir">Rates and Requests</h1>
      <h1 className="plr5 f3 mt5 fw3 avenir">10,00 €</h1>
      <p className="mb2">First Hour</p>
      <h1 className="plr5 f3 mt5 fw3 avenir">7,00 €</h1>
      <p className="mb2">Second Hour</p>
      <h1 className="plr5 f3 mt5 fw3 avenir">30,00 €</h1>
      <p className="mb2">For Workshops and Community Events</p>
      <h1 className="plr5 f3 mt5 fw3 avenir">Commercial Events</h1>

      <p className="mb2 plr3">Commercial event rates are available on
      <span onClick={this.onClick} className="cursor link blue"> inquiry</span>.</p>
      <p className="plr3 fw6 mt10"> *To reserve workshoping or studio space
      <span onClick={this.onClick} className="cursor link blue"> get in touch </span> with us!* </p>


      </div>
    </div>

    </div>
   </article>
   );
 }


 }
 export default StudioPage;

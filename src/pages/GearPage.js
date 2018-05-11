import React from 'react';
import history from '../components/history.js';
import Reserve from '../components/Reserve.js';
import cdj from '../assets/pioneercdj.gif';
import pionset from '../assets/pionset.jpg';
import djm600 from '../assets/djm600.jpg';
import djm750 from '../assets/djm750.jpg';
import djm900 from '../assets/djm900.jpg';
import allenheath from '../assets/allenheath.jpg';
import maudio from '../assets/maudio.jpg';
import nitks2 from '../assets/nitks2.jpg';
import cubus from '../assets/cubus.jpg';
import odyusa from '../assets/odyusa.jpg';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';
const gear = [
  {
    id: "djm6",
    title: "Pioneer DJM-600",
    price: "5 €/hr",
    img: djm600,
    description: "The DJM-600 is a 4 channel effects mixer with a range of beat effects and channel cross fade options. This mixer is also acts as a beat sampler using Auto Loop Play to loop. All cables and adaptors are included with the rental price."

  },
  {
    id: "djm7",
    title: "Pioneer DJM-750",
    price: "5 €/hr",
    img: djm750,
    description: "The DJM-750 is a 4 channel effects mixer with a range of beat effects and channel cross fade options. This has the 13 Beat FX and Level/Depth knob and uses 32-bit digital signal processor. All cables and adaptors are included with the rental price."
  },
  {
    id:"djm9",
    title: "Pioneer DJM-900 Nexus",
    price: "7 €/hr",
    img: djm900,
    description: "The Pioneer DJM-900 is a 13 channel-assignable Beat FX mixer with six sound FX. The mixer has 4 input and output stereo signals and 24-bit proccessing."
  },
  {
    id:"alhez",
    title: "Allen and Heath Zed14",
    price: "5 €/hr",
    img: allenheath,
    description: "The Allen and Heath Zed14 has a configurable USB audio in/out with 6 line inputs, 4 stereo inputs and EQ. It has 69dB gain range for the XLR signal and all inputs have level control."

  },
  {
    id: "trifipr",
    title: "M-Audio Trigger Finger Pro",
    price: "5 €/hr",
    img: maudio,
    description: "The M-Audio Trigger Finger Pro is a pad controller with step sequencer. It has 16 velocity and pressure RGB pads and multiple MIDI connections."

  },
  {
    id:"nitk",
    title: "Native Instruments Traktor Kontrol S2",
    price: "7 €/hr",
    img: nitks2,
    description: "The Traktor Kontrol S2 is a 2-Deck DJ system for Mac and PC. The controller inculdes a two channel mixer and many DJ effects. In addition it has 3-band EQ and a remix knob in addition to the 2 deck channels. The software for this controller is not available for rent."

  },
  {
    id:"pcdj",
    title: "PIONEER CDJ-2000NXS2 (x2)",
    price: "7 €/hr",
    img: cdj,
    description: "These CDJs have 96 kHz/24-bit digital signal processing and sound card. There are 8 hot cues, MIDI Control, Audio Standby, DJPro Link, 1 Digital and 1 Analogue output and 2 USB ports."

  },
  {
    id:"piset",
    title: "Pioneer Set",
    price: "20 €/hr",
    img: pionset,
    description: "Inclues 2 Pioneer CDJ-2000 NXS2 and the Pioneer DJM-900 Nexus. All cables and adaptors needed included in the rental price."

  },
  {
    id:"jcss",
    title: "JustIn Cubus 21 (Sub+Satellite Units)",
    price: "10 €/hr",
    img: cubus,
    description: "The speakers are equipped with 80 Watts RMS per @ 8Ohm, 150 W Max, 2-way system with a frequency range of 155 – 22,000 Hz and a maximum sound pressure of 130 dB. The subwoofer is equipped with 250 watts RMS power @ 4 ohm and 500 watt max 10 woofer. The frequency Range is 50 – 160 Hz with a sound pressure maximum of 123 dB."

  },
  {
    id:"odcs",
    title: "ODYUSA Case (x3)",
    price: "3 €/hr",
    img: odyusa,
    description: "Hard case for CDJ, mixer, or controller audio equipment transport."

  },
]

class GearPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {clicked: this.props.clicked};
    history.push('/gear');
  }

 getCard(d){
   return (
     <div className="fl w-50 w-25-m w-20-l pa3">
       <Link to={{
         pathname: `/gear/${d.id}`,
         state: {
            name: d.title,
            description: d.description,
            img:d.img,
            price:d.price,
            id:d.id
          }
        }} className="db link dim tc">
         <img src={d.img} alt="mixer" className="w-100 db outline gray"/>
         <dl className="mt2 f6 lh-copy">
           <dt className="clip">Title</dt>
           <dd className="ml0 black truncate w-100">{d.title}</dd>
           <dt className="clip">Price</dt>
           <dd className="ml0 gray truncate w-100">{d.price}</dd>
         </dl>
       </Link>
     </div>
   );

 }

 render(){

   return (
     <article className="db">
      <h2 className="avenir fw1 mt10 tc f1-5 mb2">Rental Gear </h2>
        <div className="cf pa5">
          {gear.map((item) => this.getCard(item))}
        </div>
     </article>

   );


 }

}

GearPage.propTypes = {
	 clicked: PropTypes.bool,
};

export default GearPage;

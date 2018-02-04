import React from 'react';
import history from '../components/history.js';

class GearPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.push('/gear')
 }

 getCard(){
   return (
     <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center dim">
   <img src="http://www.thetechnofile.com/uploaded-images/pioneer_cdj2000.jpg" className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
   <div className="pa2 ph3-ns pb3-ns">
     <div className="dt w-100 mt1">
       <div className="dtc">
         <h1 className="f5 f4-ns mv0">Lorum Ipsum</h1>
       </div>
       <div className="dtc tr">
         <h2 className="f5 mv0">$1,000</h2>
       </div>
     </div>
     <p className="f6 lh-copy measure mt2 mid-gray">
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
   </div>
   </article>
   );

 }

 render(){
   return (
     <div>
     <center><h1 className="f3 fw1 mt2 lh-title tc">Rental Gear </h1></center>
     <div className="dt dt--fixed">
  <div className="dtc tc pv4 bg-black-10">
    {this.getCard()}
    {this.getCard()}
  </div>
  <div className="dtc tc pv4 bg-black-05">
    {this.getCard()}
    {this.getCard()}
  </div>
  <div className="dtc tc pv4 bg-black-10">
    {this.getCard()}
    {this.getCard()}
  </div>

</div>

</div>


   );


 }

 }
export default GearPage;

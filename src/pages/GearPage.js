import React from 'react';
import history from '../components/history.js';
import Reserve from '../components/Reserve.js';
const gear = [
  {
    title: "Pioneer DJM-900 NXS2",
    price: "20 EU/hr",
    img: "https://www.recordcase.de/media/image/5a/e4/66/pioneer-djm-900nxs2-main2_600x600.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."
  },
  {
    title: "AT-LP1240-USB XP Direct-Drive Professional DJ Turntable (USB & Analog) (x2)",
    price: "80 EU/hr",
    img: "https://eu.audio-technica.com/image/cache/data/AT-LP1240-USB_1-500x500.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
  {
    title: "QSC K8.2 2000W 8in Powered Speaker",
    price: "50 EU/hr",
    img: "https://d1aeri3ty3izns.cloudfront.net/media/32/326789/1200/preview.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
  {
    title: "PIONEER CDJ-2000NXS2 (x2)",
    price: "30 EU/hr",
    img: "http://djlab-lb.com/wp-content/uploads/2016/10/cdj-350_main.gif",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
  {
    title: "Pioneer Set",
    price: "100 EU/hr",
    img: "https://www.djfinancedirect.co.uk/_Assets/_managed/shop/product/images/CDJ2000_NXS2_DJM900_NXS2_medium.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
  {
    title: "Studio Time",
    price: "120 EU/hr",
    img: "https://i.pinimg.com/736x/5d/f2/b1/5df2b1f23a9205e26ed6aff65f09775c--dj-studio-ideas-dj-desk.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
  {
    title: "Machine Mikro",
    price: "50 EU/hr",
    img: "http://tomleemusic.ca/media/catalog/product/cache/1/image/1500x/040ec09b1e35df139433887a97daa66f/1/6/162694_1_7.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
  {
    title: "Sony Headphones",
    price: "10 EU/hr",
    img: "https://d1aeri3ty3izns.cloudfront.net/media/17/173618/215/preview.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas efficitur tellus, sit amet ultricies odio commodo non. In aliquam risus at est consequat, at vehicula dolor imperdiet. Mauris sed auctor metus. Curabitur vitae sagittis metus. Mauris id arcu viverra, bibendum nisl eu, dignissim nibh. In consequat facilisis dictum. Quisque sit amet tincidunt lorem. Etiam sagittis mauris turpis, ac convallis ex cursus blandit. Cras molestie, purus non interdum fermentum, eros libero aliquam nisl, ac pretium augue lacus quis nunc. Aenean venenatis metus sit amet velit auctor eleifend."

  },
]

class GearPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {clicked: false};
    history.push('/gear');
  }

 handleClick = (name, description, img, id) => {
   console.log(this.state.clicked)
       this.setState({
         clicked: true,
         name: name,
         id: id,
         img: img,
         description: description
     });

   }



 getCard(d){
   return (
     <div className="fl w-50 w-25-m w-20-l pa3">
       <div onClick={ () => this.handleClick(d.title, d.description, d.img, "id")} className="db link dim tc">
         <img src={d.img} alt="mixer" className="w-100 db outline gray"/>
         <dl className="mt2 f6 lh-copy">
           <dt className="clip">Title</dt>
           <dd className="ml0 black truncate w-100">{d.title}</dd>
           <dt className="clip">Price</dt>
           <dd className="ml0 gray truncate w-100">{d.price}</dd>
         </dl>
       </div>
     </div>
   );

 }

 render(){
   if (this.state.clicked) {
     return (
       <Reserve img={this.state.img} name={this.state.name} id={this.state.id} description={this.state.description}></Reserve>
     );
   }
   return (

     <article className="ml7-5 db pb5">
      <h2 className="avenir fw1 mt10 pl5 f1-5 mb0">Rental Gear </h2>
        <div className="cf pa2">
          {gear.map((item) => this.getCard(item))}
        </div>
     </article>

   );


 }

}
export default GearPage;

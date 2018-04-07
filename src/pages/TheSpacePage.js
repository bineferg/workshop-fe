import React from 'react';
import dwnst from '../assets/dwnst.jpg';
import bkrm from '../assets/bkrm.jpg';
import gallary from '../assets/gallary-cropped.jpg';
import wkSpace from '../assets/wk-space.jpg';
import ladder from '../assets/ladder.jpg';
import history from '../components/history.js';


class TheSpacePage extends React.Component {
  constructor() {
    super();
    history.push('/space');
  }


  render() {
	  return (
      <main className="cf helvetica dark-gray bg-white pa3 pa4-m pa5-l">
          <div className="fl w-50 pr2 pr3-l mb3 mb4-l">
            <div className="cover resize_fit_center pv5 pv6-m pv7-l black center" style={{backgroundImage:`url(${wkSpace})`}}></div>
          </div>
          <div className="fl w-50 w-25-l pl2 pr2-m ph2-l mb3 mb4-l">
            <div className="cover resize_fit_center pv5 pv6-m pv7-l center" style={{backgroundImage: `url(${bkrm}) `}}> </div>
          </div>
          <div className="fl w-50 w-50 w-20-l pr2 pr0-l pl3-l mb3 mb4-l">
              <div className="cover pv5 pv6-m pv7-l left" style={{backgroundImage: `url(${gallary}) `}}> </div>
            </div>
          <div className="fl w-50 w-50 w-25-l pl2 pl0-l pr2-m pr4-l mb3 mb4-l">
            <div className="cover pv5 pv6-m pv7-l center" style={{backgroundImage: `url(${dwnst}) `}}> </div>
          </div>
          <div className="fl w-100 w-50-l pr2-l pl2-ns mb4 mb0-l mb4 outline">
            <div className="pa4">
              <h1 className="f4 f2-l fw7 mt0 pv3-l bb-l bb--black">The Workshop</h1>
              <p className="lh-copy mt2 mt3-m mt5-l f6">
                <span className="db-l measure-wide">
                The Workshop is a space for communal, open source, autodidactic learning for those curious in
                interdisciplinary and experimental art forms, music and writing, as well as an exhibition space and gallery
                for on going shows, talks and public performances.<br></br><br></br>
                 Going forward, this space strives to work on a community publication in the upcoming year with contributions of
women in particular but also trans* women and non-binary people regarding their experiences of sexual
misconduct and abuse toward and of them.
                  </span>
              </p>
            </div>
          </div>
          <div className="cf">
            <div className="fl w-15 pl3-l mb3 mb4-l">
                <div className="cover pv5 pv6-m pv7-l" style={{backgroundImage: `url(${ladder}) `}}> </div>
            </div>
          </div>
      </main>

		 );
  }
}

export default TheSpacePage;

import React from 'react';
import bgimage from '../assets/background.bluegreen.jpg';



class HomePage extends React.Component {

  constructor(props){
    super(props)
  }
  render() {
    return (
    <main>
      <article className="bg-white">
        <div className="vh-75 cover bg-center mt8 mb4" style={{backgroundImage: `url(${bgimage})`}}></div>
          <div className="pv5 f4 f2-ns ph6-l measure-home center">
            <h1 className="fw6 f1 fl w-100 black-70 mt0 mb3 avenir tc">The Workshop On Forster.</h1>
            <p className="db lh-copy black-70 fw1 mv0 f4 f3-m f2-l measure avenir">
A space for communal, open source, autodidactic learning for those curious in
interdisciplinary and experimental art forms.
            </p>
          </div>
          <div className="logo-green-bg center">
      <div className="measure-home f3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">Film and Photography</h1>
        <p className="lh-copy mt5 measure f4 f3-ns black-70 fw1 avenir">
          The Workshop offers a fully equipped photo lab with analog and digital cameras as well as projectors for reel and digital screenings. Film and photo events include
          screenings and discussions, workshops, and photography shows in our gallery space.
      </p>
      </div>
      </div>
      <div className="measure-home f3 mt3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">Writing</h1>
        <p className="lh-copy measure f4 f3-ns black-70 fw1 avenir">
          The Workshop offers a home to the desk-less and the restless writers. In addition to organised and guided workshops, a few hours a week are reserved as „open desk“ time.
          This communal writing space is home to a strong community of writers who are interested in reading and processing each other’s work.
        </p>

      </div>
      <div className="logo-blue-bg pb3 center">
      <div className="measure-home f3 mt3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">Music</h1>
        <p className="lh-copy measure f4 f3-ns black-70 fw1 avenir">
          The audio studio space comes equipped with state of the dj equipment, machine drums, synths, and vintage sound gear. The space is used for independent work as well as larger, curated events and workshops open to the community.
          Open events include workshops in any shape or form that the space can realise, hosting regular female:pressure meet-ups, hosting regular „drop-in“ hours for people who have questions about gear and
          production, small concerts, and other experimental communal audio exercises.
            </p>

      </div>
      </div>

          </article>
          </main>
    );
  }
}

export default HomePage;

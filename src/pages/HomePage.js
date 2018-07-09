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
interdisciplinary and experimental art forms, music and writing, as well as an exhibition space and gallery
for on going shows, talks and public performances.
            </p>
          </div>
          <div className="logo-green-bg center">
      <div className="measure-home f3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">Film and Photography</h1>
        <p className="lh-copy mt5 measure f4 f3-ns black-70 fw1 avenir">
          The Workshop has a fully equipped photo lab as well as a few analog and digital cameras. There is also be the option of using projectors to screen actual film reels. Events relating to this film shall include:
          film screenings and discussions, workshops and perhaps eventually open call contributions to any Zine or magazine The Workshop might eventually publish. Photography shows in the gallery are of course also a possibility.
      </p>
      </div>
      </div>
      <div className="measure-home f3 mt3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">Writing</h1>
        <p className="lh-copy measure f4 f3-ns black-70 fw1 avenir">
          The Workshop offers a home to desk less and restless writers. Aside from organised and lead workshops, a few hours a week are reserved as „open desk“ time, ie a time where people can sign up and rent a desk for a small fee to work on their writing. The goal is to create a strong community of writers, who are interested in reading and hearing each other’s work but who will also foster a public interest in this particular art form.
        </p>

      </div>
      <div className="logo-blue-bg pb3 center">
      <div className="measure-home f3 mt3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">Music</h1>
        <p className="lh-copy measure f4 f3-ns black-70 fw1 avenir">
          Events include workshops in any shape or form that the space can realise, hosting regular female:pressure meet-ups, hosting regular „drop-in“ hours for people who have questions about gear and
          production (under the supervision and with the help of professional sound engineers or artists who feel confident enough to provide such service) and small day time concerts that do not produce overly high sound volumes.
            </p>

      </div>
      </div>

          </article>
          </main>
    );
  }
}

export default HomePage;

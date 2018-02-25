import React from 'react';
import bgimage from '../assets/space.jpg'


class AboutUsPage extends React.Component {
  constructor() {
    super();
  }


  render() {
	  return (
			<div className="tc ph4 mt8">
        <div className="center w-50"style={{backgroundImage: `url(${bgimage})`}}></div>
        <img className="w-50 mb4" src={bgimage}/>
        <h2 className="f5 f4-m f3-l fw2 black-80 mt0 lh-copy">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </h2>
			</div>
		 );
  }
}

export default AboutUsPage;

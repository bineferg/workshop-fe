import React from 'react';
import bgimage from '../assets/background.jpg'


class AboutUsPage extends React.Component {
  constructor() {
    super();
  }


  render() {
	  return (
			<div className="tc ph4 ">
	  <h1 className="f3 f2-m f1-l fw2 black-90 mt0">
         About Us
        </h1>
        <div className="vh-80 cover bg-center w-100" style={{backgroundImage: `url(${bgimage})`}}></div>
        <h2 className="f5 f4-m f3-l fw2 black-80 mt0 lh-copy">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </h2>
			</div>
		 );
  }
}

export default AboutUsPage;

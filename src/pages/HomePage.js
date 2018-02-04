import React from 'react';
import bgimage from '../assets/background.jpg'

class HomePage extends React.Component {
  constructor() {
    super();
  }
  
 
  render() {
    return (
    <div className="vh-100 cover bg-center" style={{backgroundImage: `url(${bgimage})`}}></div>
    );
  }
}

export default HomePage;

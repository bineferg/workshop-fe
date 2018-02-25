import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage.js';
import EventPage from './pages/EventPage.js';
import WorkshopPage from './pages/WorkshopPage.js';
import AboutUsPage from './pages/AboutUsPage.js';
import { Router, Route, Link, Switch } from 'react-router-dom';
import bgimage from './assets/background.bluegreen.jpg';
import GearPage from './pages/GearPage.js';
import ContactUsPage from './pages/ContactUs.js';
import history from './components/history.js';
import './app.css';
import registerServiceWorker from './registerServiceWorker';
import homeicon from './assets/icon.png';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
   <Router history={history}>
     <div className="avenir">

     <div className="tc main-nav sticky">
    <Link to="/" className="no-underline gray fl"><img className="w-40 dib mt0 ml0 mb0 icon fl" src={homeicon}/></Link>
      <Link to="/contact" className="link dim gray f6 dib mr3 mt4 fr">Contact Us</Link>
      <Link to="/about" className="link dim gray f6 dib mr3 mt4 fr">The Space</Link>
      <Link to="/events" className="link dim gray f6 dib mr3 mt4 fr">Exhibitions</Link>
      <Link to="/workshops" className="link dim gray f6 dib mr3 mt4 fr">Workshops</Link>

	</div>
    <Switch>
    	<Route exact path="/" component={HomePage} />
    	<Route path="/events" component={EventPage} />
      <Route path="/workshops" component={WorkshopPage} />
    	<Route path="/about" component={AboutUsPage} />
      <Route path="/contact" component={ContactUsPage}/>
    	</Switch>
     </div>
   </Router>
   ),
    document.getElementById('mount')
  );
});
registerServiceWorker();

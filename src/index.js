import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage.js';
import EventPage from './pages/EventPage.js';
import AboutUsPage from './pages/AboutUsPage.js';
import AdminPage from './pages/AdminPage.js';
import EventsAdminPage from './pages/EventsAdminPage.js';
import { Router, Route, Link, Switch } from 'react-router-dom';
import bgimage from './assets/background.bluegreen.jpg';
import GearPage from './pages/GearPage.js';
import ContactUsPage from './pages/ContactUs.js';
import history from './components/history.js';
import './app.css';
import registerServiceWorker from './registerServiceWorker';
import homeicon from './assets/home-icon.png';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
   <Router history={history}>
     <div className="avenir">
     <Link to="/" className="mt0 fl"><img className="w-40 icon" src={homeicon}/></Link>
     <div className="tc main-nav">
      <Link to="/contact" className="link dim gray f4 dib mr3 mt1 fr">Contact Us</Link>
      <Link to="/about" className="link dim gray f4 dib mr3 mt1 fr">About Us</Link>
      <Link to="/events" className="link dim gray f4 dib mr3 mt1 fr">Events</Link>
	</div>
    <Switch>
    	<Route exact path="/" component={HomePage} />
    	<Route path="/events" component={EventPage} />
    	<Route path="/about" component={AboutUsPage} />
    	<Route path="/admin" component={AdminPage} />
      <Route path="/contact" component={ContactUsPage}/>
    	</Switch>
     </div>
   </Router>
   ),
    document.getElementById('mount')
  );
});
registerServiceWorker();

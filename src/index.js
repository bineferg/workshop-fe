import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage.js';
import EventPage from './pages/EventPage.js';
import AboutUsPage from './pages/AboutUsPage.js';
import AdminPage from './pages/AdminPage.js';
import EventsAdminPage from './pages/EventsAdminPage.js';
import { Router, Route, Link, Switch } from 'react-router-dom';
import bgimage from './assets/background.jpg';
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
     <Link to="/" className="mt0 fl"><img src={homeicon}/></Link>
     <div className="tc main-nav">
      <Link to="/contact" className="link dim gray f6 f5-ns dib mr3 fr">Contact Us</Link>
      <Link to="/about" className="link dim gray f6 f5-ns dib mr3 fr">About</Link>
    	<Link to="/gear" className="link dim gray f6 f5-ns dib mr3 fr">Workshop</Link>
      <Link to="/events" className="link dim gray f6 f5-ns dib mr3 fr">Events</Link>
	</div>
    <Switch>
    	<Route exact path="/" component={HomePage} />
      <Route path="/gear" component={GearPage} />
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

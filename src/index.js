import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage.js';
import EventPage from './pages/EventPage.js';
import AboutUsPage from './pages/AboutUsPage.js';
import AdminPage from './pages/AdminPage.js';
import EventsAdminPage from './pages/EventsAdminPage.js';
import { Router, Route, Link, Switch } from 'react-router-dom';
import bgimage from './assets/background.jpg';
import history from './components/history.js';
import './app.css';
import registerServiceWorker from './registerServiceWorker';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
   <Router history={history}>
     <div className="avenir">
     <div className="tc pb3 main-nav">
 	    <Link to="/" className="link dim gray f6 f5-ns dib mr3">Home</Link>
    	<Link to="/events" className="link dim gray f6 f5-ns dib mr3">Events</Link>
    	<Link to="/gear" className="link dim gray f6 f5-ns dib mr3">Gear</Link>
    	<Link to="/about" className="link dim gray f6 f5-ns dib mr3">About</Link>
	</div>
        <Switch>
    	<Route exact path="/" component={HomePage} />
    	<Route path="/events" component={EventPage} />
    	<Route path="/about" component={AboutUsPage} />
    	<Route path="/admin" component={AdminPage} />
    	</Switch>
     </div>
   </Router>
   ),
    document.getElementById('mount')
  );
});
registerServiceWorker();

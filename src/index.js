import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage.js';
import AdminPage from './pages/AdminPage.js';
import EventPage from './pages/EventPage.js';
import WorkshopPage from './pages/WorkshopPage.js';
import TheSpacePage from './pages/TheSpacePage.js';
import GearPage from './pages/GearPage.js'
import { Router, Route, Link, Switch } from 'react-router-dom';
import ContactUsPage from './pages/ContactUs.js';
import history from './components/history.js';
import './app.css';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
   <Router history={history}>
     <div className="avenir">

     <div className="tc main-nav sticky">
    <Link to="/" className="no-underline avier black fl"><p className="f-home pl3 f2 fw1 mt0 mb0">WORKSHOP</p>
    </Link>
      <Link to="/contact" className="link  hover-logo-blue black f6 dib mr2 mt4 fr">CONTACT US</Link>
      <Link to="/space" className="link  hover-logo-green black f6 dib mr2 mt4 fr">THE SPACE</Link>
      <Link to="/events" className="link  hover-logo-blue black f6 dib mr2 mt4 fr">EXHIBITIONS</Link>
      <Link to="/workshops" className="link hover-logo-green black f6 dib mr2 mt4 fr">WORKSHOPS</Link>

	</div>
    <Switch>
    	<Route exact path="/" component={HomePage} />
    	<Route path="/events" component={EventPage} />
      <Route path="/workshops" component={WorkshopPage} />
    	<Route path="/space" component={TheSpacePage} />
      <Route path="/contact" component={ContactUsPage}/>
      <Route path= "/gear" component={GearPage} />
      <Route path= "/admin" component={AdminPage} />
    	</Switch>
     </div>
   </Router>
   ),
    document.getElementById('mount')
  );
});
registerServiceWorker();

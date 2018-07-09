import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage.js';
import AdminPage from './pages/AdminPage.js';
import EventPage from './pages/EventPage.js';
import StudioPage from './pages/StudioPage.js';
import WorkshopPage from './pages/WorkshopPage.js';
import TheSpacePage from './pages/TheSpacePage.js';
import Reserve from './components/Reserve.js';
import LoginPage from './pages/LoginPage.js';
import GearPage from './pages/GearPage.js';
import { Router, Route, Link, Switch } from 'react-router-dom';
import ContactUsPage from './pages/ContactUs.js';
import history from './components/history.js';
import './app.css';
import registerServiceWorker from './registerServiceWorker.js';
import {Menu, Dropdown} from 'antd';
import Auth from './components/Auth.js';


document.addEventListener('DOMContentLoaded', function() {
  const onClick = function ({ key }) {
    history.push("/"+key)
  };

  const menu = ( <Menu onClick={onClick}>
    <Menu.Item key="gear">GEAR
    <Link to="/gear"className="no-underline avier black fl"/>
    </Menu.Item>
    <Menu.Item key="studio">SPACE
    <Link to="/studio"className="no-underline avier black fl"/>
    </Menu.Item>
  </Menu>
)

  const auth = new Auth();
  const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
  }

  ReactDOM.render((
   <Router history={history}>

    <div className="avenir">
     <Menu>
     <div className="tc main-nav sticky">

    <Link to="/" className="no-underline avier black fl"><p className="f-home pl2 f2 fw1 mt0 mb0">WORKSHOP</p>
    </Link>
      <Link to="/contact" className="link  hover-logo-blue black f6 dib mr2 mt4 fr">CONTACT US</Link>
      <Link to="/space" className="link  hover-logo-green black f6 dib mr2 mt4 fr">THE SPACE</Link>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" className="link cursor hover-logo-blue black f6 dib mr2 mt4 fr">
          RENTAL
        </a>
      </Dropdown>
      <Link to="/events" className="link  hover-logo-blue black f6 dib mr2 mt4 fr">EVENTS</Link>
      <Link to="/workshops" className="link hover-logo-green black f6 dib mr2 mt4 fr">WORKSHOPS</Link>


	</div>
  </Menu>
    <Switch>
    	<Route exact path="/" render={(props)=> (
        <HomePage auth={auth}/>
      )} />
      <Route exact path="/login" render={(props)=> (
        <LoginPage auth={auth}/>
      )} />
    	<Route path="/events" component={EventPage} />
      <Route path="/workshops" component={WorkshopPage} />
    	<Route path="/space" component={TheSpacePage} />
      <Route path="/contact" component={ContactUsPage}/>
      <Route exact path="/admin" render={(props) => (
        handleAuthentication(props),
        <AdminPage auth={auth} {...props}/>
      )}/>
      <Route exact path= "/gear" render={(props) => (
          <GearPage {...props}/>
        )} />
      <Route exact path="/gear/:gearID" component={Reserve}/>
      <Route path= "/studio" component={StudioPage} />
    	</Switch>
     </div>
   </Router>
   ),
    document.getElementById('mount')
  );
});
registerServiceWorker();

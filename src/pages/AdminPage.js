import React from 'react';
import AdminEventList from '../components/AdminEventList.js';
import AdminWorkshopList from '../components/AdminWorkshopList.js';
import CreateEventPage from './CreateEventPage.js';
import CreateWorkshopPage from './CreateWorkshopPage.js';
import ErrPage from './ErrPage.js';
import LoginPage from './LoginPage.js';
import ReadMePage from './ReadMePage.js';
import history from '../components/history.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SignUpsList from '../components/SignUpsList.js';
import PropTypes from 'prop-types';

const signupsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/signup"
const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"
const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const eventImageURL = "https://workshop-objects-1.s3.amazonaws.com/events/";
const workshopImageURL = "https://workshop-objects-1.s3.amazonaws.com/workshops/";


class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          activeTab: "manageEvents"
        };
        history.push("/admin")
        this.sortEvents = this.sortEvents.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sortWorkshops = this.sortWorkshops.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.createWorkshop = this.createWorkshop.bind(this);
        this.handleEventFileList = this.handleEventFileList.bind(this);
        this.logOut = this.logOut.bind(this);
    }

  logOut(){
    this.props.auth.logout()
  }

  sortEvents(events) {
      events.sort(function(a, b) {
          a = new Date(a.createdAt);
          b = new Date(b.createdAt);
          return a>b ? -1 : a<b ? 1 : 0;
      });
      return events;
    }

    sortWorkshops(workshops) {
      workshops.sort(function(a, b) {
          a = new Date(a.CreatedAt);
          b = new Date(b.CreatedAt);
          return a>b ? -1 : a<b ? 1 : 0;
      });
      return workshops;
    }

    handleEventFileList(data){
      var fileListMap = {};
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        fileListMap[item.id] = [];
        fileListMap[item.id].push({
          uid: item.id,
          name: item.id+'.jpg',
          status: 'done',
          url: eventImageURL+item.id+'.jpg',
        });

      }
      return fileListMap;
    }

    handleWorkshopFileList(data){
      var fileListMap = {};
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        fileListMap[item.WorkshopID] = [];
        fileListMap[item.WorkshopID].push({
          uid: item.WorkshopID,
          name: item.WorkshopID+'.jpg',
          status: 'done',
          url: workshopImageURL+item.WorkshopID+'.jpg',
        });

      }
      return fileListMap;
    }


componentDidMount() {
    fetch(eventsURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
          },
          method : 'GET'})
      .then(d => d.json())
      .then(d => {
        this.setState({
          eventData: d
        })
      }).catch(error => this.setState({ err: true}));

      fetch(workshopURL, {
    		headers: {
         			'Accept': 'application/json',
    			    'Content-Type': 'application/json'
         		},
         		method : 'GET'})
    		.then(d => d.json())
    		.then(d => {
    			this.setState({
    				workshopData: d
    			})
    		}).catch(error => this.setState({ err: true}));

        fetch(signupsURL + '/all', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET',
        })
        .then(d => d.json())
        .then(d => {
          this.setState({
    				signupData: d
    			})
        })
        .catch(error => {
          this.setState({err : true})
        });
    }

    createEvent = () => {
      this.setState({
        createEvent:true
      });
    }
    createWorkshop = () => {
      this.setState({
        createWorkshop:true
      });
    }


  handleClick = (e) => {
      this.setState({
        activeTab: e.target.value
      });
    }

	render(){
    if(!this.props.auth.isAuthenticated()){
      return(<LoginPage auth={this.props.auth}/>);
    }
    if(this.state.err){
      return (<ErrPage/>);
    }
    if(!this.state.eventData || !this.state.workshopData || !this.state.signupData) return<p></p>;

    if(this.state.createEvent){
      return(
        <CreateEventPage/>
      );
    }
    if(this.state.createWorkshop){
      return(
        <CreateWorkshopPage/>
      );
    }
      return (
        <div className="mt10">
        <center>
        <h2 className="avenir fw1 f1-5 mb0 ph0-l">Admin Center</h2>
        <div className="fr pr3">
          <a className="f6 link dim br2 ph3 pointer pv1 mb2 dib white bg-dark-blue" onClick={this.logOut}>Logout</a>
        </div>
        </center>
  		    <Tabs>
              <TabList>
                <Tab>Manage Events</Tab>
                <Tab>Manage Workshops</Tab>
                <Tab>Sign Ups</Tab>
                <Tab>README.md</Tab>
              </TabList>

              <TabPanel>
                <div>
                  <center>
                    <button className="f6 grow no-underline logo-blue-bg ba ph3 pv2 mb4 mt4 dib near-black" onClick={() => this.createEvent()} >
                    + Create Event
                    </button>
                  </center>
                  <AdminEventList data={this.sortEvents(this.state.eventData.events)} fileListMap={this.handleEventFileList(this.state.eventData.events)}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <center>
                      <button className="f6 grow no-underline logo-green-bg ba ph3 pv2 mb4 mt4 dib near-black" onClick={() => this.createWorkshop()}>
                          + Create Workshop
                      </button>
                  </center>
                  <AdminWorkshopList data={this.sortWorkshops(this.state.workshopData.workshops)} fileListMap={this.handleWorkshopFileList(this.state.workshopData.workshops)}/>
                </div>
              </TabPanel>
              <TabPanel>
                <SignUpsList data={this.state.signupData}/>
              </TabPanel>
              <TabPanel>
                <ReadMePage/>
              </TabPanel>
            </Tabs>
            </div>
  		)


	}

}
AdminPage.propTypes = {
	 auth: PropTypes.object,
	 children: PropTypes.node
};

export default AdminPage;

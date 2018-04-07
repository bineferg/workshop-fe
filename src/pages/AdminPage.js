import React from 'react';
import { Link, Route } from 'react-router';
import AdminEventList from '../components/AdminEventList.js';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class AdminPage extends React.Component{
    constructor(){
        super();
        this.setState({
            activeTab: "manageEvents"
        })

    }

handleClick = (e) => {
    this.setState({
        activeTab: e.target.value
    })
        console.log(this.state.activeTab)
}

	render(){
		return (
      <div className="mt10">

		<Tabs>
            <TabList>
              <Tab>Manage Events</Tab>
              <Tab>Manage Workshops</Tab>
            </TabList>

            <TabPanel>
            <div>
            <center>
              <a class="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib near-black" href="#0">
                Create Event
              </a>

            </center>
            <AdminEventList/>
            </div>
            </TabPanel>
            <TabPanel>
            <div>
            <center>
            <a class="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib near-black" href="#0">
            Create Workshop
            </a>
            </center>
            </div>

            </TabPanel>

          </Tabs>
          </div>
		);

	}

}

export default AdminPage;

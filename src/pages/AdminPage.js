import React from 'react';
import { Link, Route } from 'react-router';
import EventsAdminPage from './EventsAdminPage.js'
import WorkshopsAdminPage from './WorkshopsAdminPage.js'
import AboutUsPage from './AboutUsPage.js'
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
      <div>
      
		<Tabs>
            <TabList>
              <Tab>Manage Events</Tab>
              <Tab>Manage Workshops</Tab>
              <Tab>Manage About </Tab>
            </TabList>

            <TabPanel>
              <EventsAdminPage/>
            </TabPanel>
            <TabPanel>
              <WorkshopsAdminPage/>
            </TabPanel>
            <TabPanel>
              <AboutUsPage/>
            </TabPanel>
          </Tabs>
          </div>
		);

	}

}

export default AdminPage;

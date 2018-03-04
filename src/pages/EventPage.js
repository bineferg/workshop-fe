import React from 'react';
import EventList from '../components/EventList.js';
import history from '../components/history.js';
import ErrPage from './ErrPage.js';

/**
 *   */

const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.push('/events');
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
}
   render() {

  if(this.state.err){
    return (<ErrPage/>);
  }
	if(!this.state.eventData ) return <p></p>;
  console.log(this.state.eventData);
	return(
			   <div>
				   <EventList data={this.state.eventData.events}/>
			   </div>

		 );

   }

}

export default EventPage;

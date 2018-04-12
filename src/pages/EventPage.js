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
    this.sortEvents = this.sortEvents.bind(this);
 }

 sortEvents(events) {

   events.sort(function(a, b) {
       a = new Date(a.createdAt);
       b = new Date(b.createdAt);
       console.log(a.CreatedAt)
       console.log(b.CreatedAt)
       return a>b ? -1 : a<b ? 1 : 0;
   });
   return events;
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

	return(
			   <div>
				   <EventList data={this.sortEvents(this.state.eventData.events)}/>
			   </div>

		 );

   }

}

export default EventPage;

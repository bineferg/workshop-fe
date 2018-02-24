import React from 'react';
import EventList from '../components/EventList.js';
import history from '../components/history.js';
import ErrPage from './ErrPage.js';

/**
 *   */

const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"
const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.push('/events');
 }

shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
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
   }

   render() {

  if(this.state.err){
    return (<ErrPage/>);
  }
	if(!this.state.eventData || !this.state.workshopData) return <p>Loading...</p>;
	return(
			   <div>
			   <center><h1 className="f3 fw1 mt2 lh-title tc">Upcoming Events</h1></center>
				   <EventList data={this.shuffleArray(this.state.eventData.events.concat(this.state.workshopData.workshops))}/>
			   </div>

		 );

   }

}

export default EventPage;

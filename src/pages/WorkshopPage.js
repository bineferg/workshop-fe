import React from 'react';
import WorkshopList from '../components/WorkshopList.js';
import history from '../components/history.js';
import ErrPage from './ErrPage.js';

/**
 *   */

const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"

class WorkshopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.push('/workshops');
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
	if(!this.state.workshopData) return <p>Loading...</p>;
	return(
			   <div>
				   <WorkshopList data={this.state.workshopData.workshops}/>
			   </div>

		 );

   }

}

export default WorkshopPage;

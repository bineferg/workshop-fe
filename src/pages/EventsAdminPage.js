import React from 'react';
import thumb from '../assets/test.jpg';
import CreateModal from '../components/CreateModal.js';
import CreateEventForm from '../components/CreateEventForm.js';
import ClickToEdit from 'react-click-to-edit';
import EditableItem from '../components/EditableItem.js';



const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"

class EventsAdminPage extends React.Component{

/**
 *
 * View, Edit, Delete, and Add Events -- Admin only
 *
 * */

	constructor(props){
		super(props);
		this.state={isOpen: false};
	}
        toggleModal = () => {
    		this.setState({
      		isOpen: !this.state.isOpen,
    		});
  	}

  	componentDidMount() {
		fetch(backendURL, {
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
		})
   	}

   	createEvent(data){

   	}

	deleteEvent(eventID){
		fetch(backendURL+'?event_id='+eventID, {
		headers: {
     			'Accept': 'application/json',
			'Content-Type': 'application/json'
     		},
     		method : 'DELETE'})
     		.then(function(resp){
     		    if (!resp.ok) {
                           console.log("error", resp)
                        }
     		 })
     	window.location.reload()
	}

	renderWithEdit(d) {
		const editStyle = {
			 width: '700px',
  			height: '100px'
		}
			return (
				<div>

					<tr>
					<td> <img src={thumb} height="100" width="100"/></td>
					<td> <ClickToEdit style={editStyle}
						endEditing={(value) => console.log(`New value: ${value}`)}>{d.name}</ClickToEdit> </td>

					 <td width="auto"><ClickToEdit>{d.description}</ClickToEdit></td>

					 <td><ClickToEdit>{new Intl.NumberFormat('de-EU', {
						style: 'currency',
						currency: 'EUR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
						}).format(d.cost)}</ClickToEdit></td>

					<td><ClickToEdit>{new Intl.DateTimeFormat('de-EU', {
						year: 'numeric',
						month: 'long',
						day: '2-digit'
						}).format(new Date(d.time))}</ClickToEdit></td>

					<button onClick={ () => this.deleteEvent(d.id)}>Delete</button>
					</tr>
					</div>
			);
	}


	render(){
	if(!this.state.eventData) return <p>Loading...</p>;

	return(	<div>
		<center><h1 className="f3 f2-m f1-l fw2 black-90 mv3"> Events Admin </h1></center>
		<center><button onClick={this.toggleModal}>Create</button></center>
		<EditableItem data="some text"/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
			<table width="80%" align="center">
			{this.state.eventData.events.map( ( item ) => {
        			return this.renderWithEdit( item );
      			})}
			</table>
		<CreateModal onClose={this.toggleModal} show={this.state.isOpen}> <CreateEventForm/></CreateModal>
			</div>);

	}




}

export default EventsAdminPage;

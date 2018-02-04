import React from 'react';
import thumb from '../assets/test.jpg';
import CreateModal from '../components/CreateModal.js';
import CreateWorkshopForm from '../components/CreateWorkshopForm.js';
import ClickToEdit from 'react-click-to-edit';
	

const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"

class WorkshopsAdminPage extends React.Component{

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

  	deleteWorkshop(workshopID){
  	    console.log(workshopID)
  	    fetch(backendURL+'?workshop_id='+workshopID, {
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
        this.setState({
            nothing: "hey"
        })
        this.render()

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
				workshopData: d
			})	
		})
   	}
	list(data) {
		return( 
				data.map((d) =>
					<tr>
					<td> <img src={thumb} height="100" width="100"/></td>
					<td><ClickToEdit>{d.Name} </ClickToEdit></td>
					<td> <ClickToEdit>{d.Description}</ClickToEdit>
					<button onClick={ () => this.deleteWorkshop(d.WorkshopID)}>Delete</button></td>
					<td> <ClickToEdit>{d.Cap} </ClickToEdit></td>
					<td> <ClickToEdit>{d.Level}</ClickToEdit></td>
					<td> <ClickToEdit>{d.Location}</ClickToEdit></td>
					<td> <ClickToEdit>{new Intl.NumberFormat('de-EU', { 
						style: 'currency', 
						currency: 'EUR',
						minimumFractionDigits: 0, 
						maximumFractionDigits: 0 
						}).format(d.Cost)}</ClickToEdit></td>
					<td><ClickToEdit>
					{new Intl.DateTimeFormat('de-EU', { 
						year: 'numeric', 
						month: 'long', 
						day: '2-digit' 
						}).format(new Date(d.StartTime))}</ClickToEdit></td>
					<td><ClickToEdit>
					{d.Duration}</ClickToEdit></td></tr>
					)
		      );

		}
	
	render(){
	if(!this.state.workshopData) return <p>Loading...</p>;
	
	return(	<div>
		<center><h1 className="f3 f2-m f1-l fw2 black-90 mv3"> Workshops Admin </h1></center>
		<center><button onClick={this.toggleModal}>Create</button></center>
			<table width="80%" align="center">
			{this.list(this.state.workshopData.workshops)}
			</table>
		<CreateModal onClose={this.toggleModal} show={this.state.isOpen}> <CreateWorkshopForm/></CreateModal>
			</div>);
	
	}




}

export default WorkshopsAdminPage;


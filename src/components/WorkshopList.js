import React from 'react';
import thumb from '../assets/test.jpg';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';

class WorkshopList extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {isOpen: false, name: "", id: ""};
	}


        toggleModal = (name, id) => {
    		this.setState({
      		isOpen: !this.state.isOpen,
		name: name,
		id: id
    	});
  	}
	
	list(data) {
		return( 
				data.map((d) =>
					<tr id={d.Name}>
					<td> <img src={thumb} height="100" width="100"/></td>
					<td>{d.Name} </td>
					<td key={d.Name}> {d.Description} <button onClick={ () => this.toggleModal(d.Name, d.WorkshopID)}>Register</button></td>
					<td> {d.Cap} </td>
					<td> {d.Level}</td>
					<td> {d.Location}</td>
					<td> {new Intl.NumberFormat('de-EU', { 
						style: 'currency', 
						currency: 'EUR',
						minimumFractionDigits: 0, 
						maximumFractionDigits: 0 
						}).format(d.Cost)}</td>
					<td>
					{new Intl.DateTimeFormat('de-EU', { 
						year: 'numeric', 
						month: 'long', 
						day: '2-digit' 
						}).format(new Date(d.StartTime))}</td>
					<td>Duration: {d.Duration}</td></tr>
					)
		      );

		}


render() {
	console.log(this.state.isOpen);
	return (
			<div>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id}/>
			</SignUpModal>
			<table width="80%" align="center">
			{this.list(this.props.data)}
			</table></div>
	       );
}

}

export default WorkshopList;

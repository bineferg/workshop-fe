import React from 'react';
const backendURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"
class CreateEventForm extends React.Component {
	constructor() {
		super();

		this.state = {
successSubmit: false,
	       name: '',
	       description:'',
	       cost:0,
	       loc:'',
	       date:'',
	       time:''
		}
	}

	handleChange = (e) => {
		let newState = {};

		newState[e.target.name] = e.target.value;

		this.setState(newState);
	};

	createId() {
		return Math.random().toString(36).substring(7);

	}

	handleSubmit = (e, message) => {
		e.preventDefault();
		var eventID = Math.random().toString(36).substring(7);
		var dateString = this.state.date+'T'+this.state.time;
		var startDate = new Date(dateString);
		var payload = {
			id: eventID,
			    name: this.state.name,
			    description: this.state.description,
			    cost:parseFloat(this.state.cost),
			    Location:this.state.loc,
			    time: startDate,
					}
		fetch(backendURL, {
			method: 'POST',
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload)
			}).catch (function (error) {
				console.log('Request failed', error);
				return;
			});

			this.setState({
			successSubmit: true,
			name: '',
			description:'',
			cost:0,
			loc:'',
			date:'',
			time:''
			});
}

render() {
	if(this.state.successSubmit) return <h1><center> Event Submitted </center></h1>;
	return(
			<form onSubmit={this.handleSubmit}>
			<h1>Create Event</h1>

			<fieldset>


			<input id='formName' className='form-input' name='name' type='text' required onChange={this.handleChange} value={this.state.name} />
			</fieldset>
			<fieldset>


			<textarea id='formDescription' className='form-textarea' name='description' required onChange={this.handleChange} value={this.state.description}></textarea>
			</fieldset>

			<fieldset>


			<input id='formcost' className='form-input' name='cost' type='number'step='0.01' required onChange={this.handleChange} value={this.state.cost} />
			</fieldset>
			<fieldset>


			<input id='formLocation' className='form-input' name='loc' type='text' required onChange={this.handleChange} value={this.state.loc} />
			</fieldset>
			<fieldset>


			<input id='formDate' className='form-input' name='date' type='date' required onChange={this.handleChange} value={this.state.date} />
			</fieldset>
			<fieldset>


			<input id='formTime' className='form-input' name='time' type='time' required onChange={this.handleChange} value={this.state.time} />
			</fieldset>


			<div>
			<input id='formButton' className='btn' type='submit' placeholder='Send message' />
			</div>
			</form>
			)
}



}

export default CreateEventForm;

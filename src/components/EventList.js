import React from 'react';
import thumb from '../assets/test-1.jpg';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';

class EventList extends React.Component {
	constructor() {
		super();
    	this.state = {isOpen: false, name: "", id: ""};
	}

  toggleModal = (name, id, isFull) => {
    		this.setState({
      		isOpen: !this.state.isOpen,
		name: name,
		id: id,
		isFull: isFull
    	});
  	}

	renderItem(d) {
		var imgName="https://workshop-objects-1.s3.amazonaws.com/events/"+d.id+".jpg"
		return(
			<article className="bt bb b--black-10 db pv4 ph3 ph0-l no-underline black">
				<div className="flex flex-column flex-row-ns">
					<div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
						<img src={imgName} className="db wrkshopImg" alt="Photo of a dimly lit room with a computer interface terminal."/>
					</div>
				<div className="w-100 w-60-ns pl3-ns">
				<h1 className="f3 fw1 avenir mt0 lh-title">{d.name}</h1>
				<p className="f6 f5-l lh-copy">{d.description}</p>
				<p className="f6 lh-copy mv0">{d.location}</p>
				<p className="f6 lh-copy mv0">Price: {new Intl.NumberFormat('de-EU', {
									style: 'currency',
									currency: 'EUR',
									minimumFractionDigits: 0,
									maximumFractionDigits: 0
								}).format(d.cost)}
				</p>
				<p className="f6 lh-copy mv0">Time: {new Intl.DateTimeFormat('de-EU', {
									year: 'numeric',
									month: 'long',
									day: '2-digit'
								}).format(new Date(d.time))}
				</p>
				</div>
				</div>
				</article>

		      );

		}




render() {

	return (
		<section className="mw7 mt8 center avenir">
		<h2 className="avenir fw1 ph3 ph0-l">Exhibitions</h2>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id} name={this.state.name} isFull={this.state.isFull}/>
			</SignUpModal>

			{this.props.data.map((item) => this.renderItem(item))}

			</section>
	       );
}

}

export default EventList;

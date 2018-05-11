import React from 'react';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';

class EventList extends React.Component {
	constructor() {
		super();
    	this.state = {isOpen: false, name: "", id: ""};
			this.handleParagraphs = this.handleParagraphs.bind(this);
	}

  toggleModal = (name, id, isFull) => {
    		this.setState({
      		isOpen: !this.state.isOpen,
					name: name,
					id: id,
					isFull: isFull
    	});
  	}

		handleParagraphs(description) {
			return description.split("[p]").map(p => {
					return <p>{p}</p>;
			})
		}


	renderItem(d) {
		var imgName="https://workshop-objects-1.s3.amazonaws.com/events/"+d.id+".jpg"
		return(
			<article className="bt bb b--black-10 db pv4 no-underline black">
				<div className="w-100">
					<div className="mb4 mb0-ns w-100">
						<img src={imgName} className="db center eventImg mb4"></img>
						</div>
				<div className="w-100">
				<h1 className="f3 fw1 tc avenir w-90 mt0 lh-title">{d.name}</h1>
				<div className="f6 f5-l center w-90 lh-copy">
					{this.handleParagraphs(d.description)}
				</div>
				<p className="f6 b ml2s f5-l lh-copy w-90 mv0">{d.location}</p>
				<p className="f6 b ml2s lh-copy w-90 mv0">Price: {d.cost}
				</p>
				<div className="f6 b ml2s lh-copy w-90 mb4 mt0 measure-narrow">Time: {d.time}
				</div>
				</div>
				</div>
				</article>

		      );

		}

render() {

	return (
		<section className="mw7 mt10 center avenir">
		<h2 className="avenir fw1 f1-5 mb0 ph3 ph0-l">Exhibitions</h2>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id} name={this.state.name} isFull={this.state.isFull}/>
			</SignUpModal>
			{this.props.data.map((item) => this.renderItem(item))}
			<div className="mb3"></div>
			</section>
	       );
}

}

export default EventList;

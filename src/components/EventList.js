import React from 'react';
import SignUpModal from '../components/SignUpModal.js';
import history from '../components/history.js';
import RegisterForm from '../components/RegisterForm.js';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

class EventList extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {isOpen: false, name: "", id: "", clicked: this.props.clicked};
			this.handleParagraphs = this.handleParagraphs.bind(this);
			history.push('/events');
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

	renderItem(d){
		var imgName="https://workshop-objects-1.s3.amazonaws.com/events/"+d.id+".jpg"
		return(
			<Link to={{
				pathname: `/events/${d.id}`,
				state: {
					 name: d.name,
					 description: d.description,
					 img:imgName,
					 location:d.location,
					 cost:d.cost,
					 time:d.time
				 }
			 }} className="db link dim">
  <article class="bt bb b--black-10">
    <a class="db pv4 ph3 ph0-l no-underline black dim" href="#0">
      <div class="flex flex-column flex-row-ns">
        <div class="mb4 mb0-ns w-33">
          <img src={imgName} class="db w-100" alt="Photo of a dimly lit room with a computer interface terminal."/>
					<div class="mt4">
					<p class="f6 lh-copy mv0 ml2 b">{d.cost}</p>
					<p class="f6 lh-copy mv0 ml2 b">{d.time}</p>
					</div>
				</div>
        <div class="w-100 w-60-ns ml3">
          <h1 class="f3 fw1 mt0 lh-title">{d.name}</h1>
          <p class="f6 f5-l lh-copy">
            {this.handleParagraphs(d.caption)}
          </p>

        </div>
      </div>
    </a>
  </article>
	</Link>
	)}
render() {

	return (
		<section className="mw7 mt10 center avenir">
		<h2 className="avenir fw1 f1-5 mb0 ph3 ph0-l">Events</h2>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id} name={this.state.name} isFull={this.state.isFull}/>
			</SignUpModal>
			{this.props.data.map((item) => this.renderItem(item))}
			<div className="mb3"></div>
			</section>
	       );
}

}
EventList.propTypes = {
	 clicked: PropTypes.bool,
};

export default EventList;

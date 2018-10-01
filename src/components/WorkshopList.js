import React from 'react';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';
import {Route, Link} from 'react-router-dom';

class WorkshopList extends React.Component {
	constructor() {
		super();
    	this.state = {isOpen: false, name: "", id: ""};
			this.handleDescription = this.handleDescription.bind(this);
	}

  toggleModal = (name, id, isFull) => {
    this.setState({
      	isOpen: !this.state.isOpen,
				name: name,
				id: id,
				isFull: isFull
    	});
  	}

		handleDescription(description) {
			return description.split("[p]").map(p => {
				return <p>{p}</p>;
			})
		}

		getButton(d, count) {
			if(count%2 === 0) {
				return (<div className="fr pr3">
				<button className="ph3 pv2 plr3 br-pill pointer no-underline ba b--black logo-green-bg link f6 dib" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
				</div>
			)
			} else {
				return ( <div className="fr pr3">
				<button className="ph3 pv2 plr3 br-pill pointer no-underline ba b--black logo-blue-bg link f6 dib" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
				</div>
			)
			}
		}

		renderItem(d, count){
			var imgName="https://workshop-objects-1.s3.amazonaws.com/workshops/"+d.WorkshopID+".jpg"
			let full=""
	    if (d.IsFull){
	        full = "Workshop Full"
	    }
			return(

	  <article class="bt bb b--black-10">
	    <div class="db pt2 ph3 ph0-l pb4">
			<Link to={{
				pathname: `/workshops/${d.WorkshopID}`,
				state: {
					 name: d.Name,
					 description: d.Description,
					 img:imgName,
					 location:d.Location,
					 cost:d.Cost,
					 time:d.Time,
					 id: d.WorkshopID,
					 count: count,
				 }
			 }} className="db no-underline black dim">
	      <div class="flex flex-column flex-row-ns">
	        <div class="mb4 mb0-ns w-33">
	          <img src={imgName} class="db w-100" alt="Photo of a dimly lit room with a computer interface terminal."/>
						<div class="mt4">
						<p class="f6 lh-copy mv0 ml2 b">{d.Cost}</p>
						<p class="f6 lh-copy mv0 ml2 b">{d.Time}</p>
						</div>
					</div>
	        <div class="w-100 w-60-ns ml3">
	          <h1 class="f3 fw1 mt0 lh-title">{d.Name}</h1>
	          <p class="f6 f5-l lh-copy">
	            {this.handleDescription(d.Caption)}
	          </p>

						</div>
	      </div>
				</Link>
				<p className="f6 ml2 lh-copy mv0 i red">{full}</p>
				{this.getButton(d, count)}
	    </div>

	  </article>

		)}


render() {
	var count = 0
	return (
		<section className="mw7 mt10 center avenir">
		<h2 className="avenir fw1 f1-5 mb0 ph0-l">Workshops</h2>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id} name={this.state.name} isFull={this.state.isFull}/>
			</SignUpModal>

			{this.props.data.map((item) => this.renderItem(item, count++))}
			<div className="mb3"></div>
			</section>

	       );
}

}

export default WorkshopList;

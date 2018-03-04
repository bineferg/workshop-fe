import React from 'react';
import thumb from '../assets/test-1.jpg';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';

class WorkshopList extends React.Component {
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

	    let full=""
	    if (d.IsFull){
	        full = "Workshop Full"
	    }
			var imgName="https://workshop-objects-1.s3.amazonaws.com/workshops/"+d.WorkshopID+".jpg"
            return(

										<article className="bt pb5 bb b--black-10 db pv4 ph3 ph0-l no-underline black">
											<div className="flex flex-column center flex-row-ns">
												<div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
													<img src={imgName} className="db wrkshopImg" alt="Photo of a dimly lit room with a computer interface terminal."/>
												</div>
											<div className="w-100 w-60-ns pl3-ns">
											<h1 className="f3 fw1 avenir mt0 lh-title">{d.Name}</h1>
											<p className="f6 f5-l lh-copy">{d.Description}</p>
											<p className="f6 b lh-copy mv0">{d.Location}</p>
											<p className="f6 lh-copy mv0 i red">{full}</p>
											<p className="f6 b lh-copy mv0">Price: {d.Cost}
											</p>
											<p className="f6 b lh-copy mv0">Time: {d.Time}
											</p>
											<button className="ph3 pv2 ba b--black bg-transparent f6 dib fr" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
											</div>
											</div>
											</article>

            );

		}




render() {

	return (
		<section className="mw7 mt10 center avenir">
		<h2 className="avenir fw1 ph3 ph0-l">Upcoming Workshops</h2>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id} name={this.state.name} isFull={this.state.isFull}/>
			</SignUpModal>

			{this.props.data.map((item) => this.renderItem(item))}
			<div className="mb3"></div>
			</section>

	       );
}

}

export default WorkshopList;

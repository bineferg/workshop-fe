import React from 'react';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';

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

	renderItem(d) {

	    let full=""
	    if (d.IsFull){
	        full = "Workshop Full"
	    }
			var imgName="https://workshop-objects-1.s3.amazonaws.com/workshops/"+d.WorkshopID+".jpg"
            return(

										<article className="bt pb5 bb b--black-10 db pv4 ph3 ph0-l no-underline black">
											<div className="flex flex-column alc justify-center center flex-row-ns">
												<div className="pr3-ns mb4 mb0-ns w-100 w-40-ns v-mid dtc">
													<img src={imgName} className="wrkshopImg mb4" alt="No Image Found"/>
													<p className="f6 ml2 b lh-copy mv0">{d.Cost}
													<p className="f6 b lh-copy mv0">{d.Location}</p>
													<p className="f6 ml2 lh-copy mv0 i red">{full}</p>
													</p>
													<p className="f6 ml2 b lh-copy mv0">{d.Time}
													</p>
											</div>
											<div className="w-100 w-60-ns pl3-ns">
											<h1 className="f3 fw1 avenir mt0 lh-title">{d.Name}</h1>
											<p className="f6 f5-l lh-copy pb2">{this.handleDescription(d.Description)}</p>
											<div className="fr pr3">
											<button className="ph3 pv2 plr3 br-pill pointer no-underline ba b--black bg-light-gray link f6 dib" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
											</div>
											</div>
											</div>
											</article>

            );

		}




render() {

	return (
		<section className="mw7 mt10 center avenir">
		<h2 className="avenir fw1 f1-5 mb0 ph0-l">Workshops</h2>
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

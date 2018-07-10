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
			var imgName="https://workshop-objects-1.s3.amazonaws.com/workshops/"+d.WorkshopID+".jpg"
	    let full=""
	    if (d.IsFull){
	        full = "Workshop Full"
	    }
			console.log(d.Description.length)
			if(d.Description.length > 1500) {
				return(
					<article className="bt bb b--black-10 db pv4 no-underline black">
						<div className="w-100">
							<div className="mb4 mb0-ns w-100">
								<img src={imgName} className="db center eventImg mb4"></img>
								</div>
						<div className="w-100">
						<h1 className="f3 fw1 tc avenir w-90 mt0 lh-title">{d.Name}</h1>
						<div className="f6 f5-l center w-90 lh-copy">
							{this.handleDescription(d.Description)}
						</div>
						<div className="fr pr3">
						<button className="ph3 pv2 plr3 br-pill pointer no-underline ba b--black bg-light-gray link f6 dib" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
						</div>
						<p className="f6 b ml2s f5-l lh-copy w-90 mv0">{d.Location}</p>
						<p className="f6 b ml2s lh-copy w-90 mv0">{d.Cost}
						</p>
						<div className="f6 b ml2s lh-copy w-90 mb4 mt0 measure-narrow">{d.Time}
						</div>

						<p className="f6 ml2 lh-copy mv0 i red">{full}</p>

						</div>
						</div>

						</article>
				)
			}

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

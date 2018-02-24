import React from 'react';
import thumb from '../assets/test.jpg';
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
	    if (d.WorkshopID){
	    console.log(d.WorkshopID)
	    let full=""
	    if (d.IsFull){
	        full = "Workshop Full"
	    }
            return(
                        <article className="bb b--black-10 db pv4 ph3 ph0-l no-underline black">
                        <div className="flex flex-column flex-row-ns">
                                <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
                                <img src={thumb} className="db"/>
                         </div>
                              <div className="w-100 w-60-ns pl3-ns">
                                <h1 className="f3 fw1 mt0 lh-title">{d.Name}</h1>
                                <p className="f6 f5-l lh-copy">{d.Description}</p>
                                <p className="f6 lh-copy mv0">{d.Location}</p>
                                <p className="i red">{full}</p>
                                <dl className="mt2 f6">
                                  <dt className="clip">Price</dt>
                                  <dd className="ml0"> {new Intl.NumberFormat('de-EU', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                            }).format(d.Cost)} </dd>
                            <dd className="ml0"> {new Intl.DateTimeFormat('de-EU', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                            }).format(new Date(d.StartTime))} </dd>
                            <dd>
                            <button className="ph3 pv2 ba b--black bg-transparent f6 dib fr" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button> </dd>
                                </dl>
                         </div>
                         </div>
                     </article>

            );
	    }
		return(
                        <article className="bb b--black-10 db pv4 ph3 ph0-l no-underline black">
                        <div className="flex flex-column flex-row-ns">
                                <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
                                <img src={thumb} className="db"/>
                                <h1 className="f3 fw1 mt0 lh-title tc">{d.name}</h1>
                         </div>

                              <div className="w-100 w-60-ns pl3-ns">
                                <p className="f6 f5-l lh-copy">{d.description}</p>
                                <p className="f6 lh-copy mv0">{d.location}</p>
                                <dl className="mt2 f6">
                                  <dt className="clip">Price</dt>
                                  <dd className="ml0"> {new Intl.NumberFormat('de-EU', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                            }).format(d.cost)} </dd>
                            <dd className="ml0"> {new Intl.DateTimeFormat('de-EU', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                            }).format(new Date(d.time))}</dd>
                                </dl>
                         </div>
                         </div>
                     </article>


		      );

		}




render() {

	return (
	        <div>
			<SignUpModal show={this.state.isOpen} name={this.state.name} id={this.state.id} onClose={this.toggleModal}>
				<RegisterForm id={this.state.id} name={this.state.name} isFull={this.state.isFull}/>
			</SignUpModal>
			<main className="mw6 center">
			{this.props.data.map((item) => this.renderItem(item))}
			</main>
			</div>
	       );
}

}

export default EventList;

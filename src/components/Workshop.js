import React from 'react';
import PropTypes from 'prop-types';
import SignUpModal from '../components/SignUpModal.js';
import RegisterForm from '../components/RegisterForm.js';


class Workshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false, name: "", id: ""};

  }

  		handleParagraphs(description) {
  			return description.split("[p]").map(p => {
  					return <p>{p}</p>;
  			})
  		}

      toggleModal = (name, id, isFull) => {
        this.setState({
            isOpen: !this.state.isOpen,
            name: name,
            id: id,
            isFull: isFull
          });
        }

      getButton(d, count) {
  			if(count%2 === 0) {
  				return (<div className="fr pr3">
  				<button className="ph4 pv2 plr5 br-pill pointer no-underline ba b--black logo-green-bg link f6 dib" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
  				</div>
  			)
  			} else {
  				return ( <div className="fr pr3">
  				<button className="ph4 pv2 plr5 br-pill pointer no-underline ba b--black logo-blue-bg link f6 dib" onClick={ () => this.toggleModal(d.Name, d.WorkshopID, d.IsFull)}>Sign Up</button>
  				</div>
  			)
  			}
  		}

    render(){
      return (

        <center>
        <SignUpModal show={this.state.isOpen} name={this.props.location.state.name} id={this.props.location.state.id} onClose={this.toggleModal}>
  				<RegisterForm id={this.props.location.state.id} name={this.props.location.state.name} isFull={this.state.isFull}/>
  			</SignUpModal>
        <article class="mt8 mw7 pa3">
          <h1 class="avenir fw1 f2 pb3 ph3">{this.props.location.state.name}</h1>
          <img src={this.props.location.state.img} class="w-75" alt="Photo of outer space"/>

          <p class="tl mt5-l lh-copy">
            {this.handleParagraphs(this.props.location.state.description)}
          </p>
          <div class="tl lh-copy">
          {this.getButton(this.props.location.state.count)}
          <p className="f6 b f5-l w-90 mv0">{this.props.location.state.location}</p>
  				<p className="f6 b f5-l w-90 mv0">Price: {this.props.location.state.cost}
  				</p>

  				<div className="f6 b f5-l w-90 mb4 mt0">Time: {this.props.location.state.time}

  				</div>
          </div>


        </article>
        </center>

      );
    }

}
Workshop.propTypes = {
   id: PropTypes.string,
   name: PropTypes.string,
	 img: PropTypes.string,
   cost: PropTypes.string,
   description: PropTypes.string,
   location: PropTypes.string,
   time: PropTypes.string,
   count: PropTypes.number,
	 children: PropTypes.node
};

export default Workshop;

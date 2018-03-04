import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png'

    class SignUpModal extends React.Component {

	constructor(props) {
		super(props);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleCloseClick = this.handleCloseClick.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside, true);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside, true);
	}

	handleClickOutside(event) {
		if(event.target.className === "backdrop") {
			return this.props.onClose(event);
		}
	}

handleCloseClick(event){
    this.props.onClose(event);
}
	render() {
let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};
		if(!this.props.show) {
			return null;
		}
        console.log(this.props.name)
		return (
				<div className="backdrop" >
				<div className="modal" >
				<img src={closeIcon} style={closeImg} onClick={this.handleCloseClick}/>
				<center><h1 className="f3 fw1 mt0 lh-title tc">{this.props.name}</h1></center>
				{this.props.children}
				</div>
				</div>
		 );
	}
}

SignUpModal.propTypes = {
	 onClose: PropTypes.func.isRequired,
	 name: PropTypes.string,
	 show: PropTypes.bool,
	 id: PropTypes.string,
	 children: PropTypes.node
};

export default SignUpModal;

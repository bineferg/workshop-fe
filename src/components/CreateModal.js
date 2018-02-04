import React from 'react';
import PropTypes from 'prop-types';

class CreateModal extends React.Component {

	constructor(props) {
		super(props);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside, true);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside, true);
	}

	handleClickOutside(event) {
		if(event.target.className == "backdrop") {
			return this.props.onClose(event);
		} 
	}



	render() {
		if(!this.props.show) {
			return null;
		}

		// The gray background
		const backdropStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50
		};
			
					// The modal "window"
		const modalStyle = {
			backgroundColor: '#fff',
			borderRadius: 5,
			maxWidth: 500,
			minHeight: 300,
			margin: '0 auto',
			padding: 30
		};

		return (
				<div className="backdrop" style={backdropStyle}>
				<div className="modal" style={modalStyle}>
				{this.props.children}
				</div>
				</div>
		       );
	}
}

CreateModal.propTypes = {
	 onClose: PropTypes.func.isRequired,
	 name: PropTypes.string,
	 show: PropTypes.bool,
	 children: PropTypes.node
};

export default CreateModal;

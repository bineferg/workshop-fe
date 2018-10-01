import React from 'react';
import PropTypes from 'prop-types';

class Eventx extends React.Component {
  constructor(props) {
    super(props);


  }

  		handleParagraphs(description) {
  			return description.split("[p]").map(p => {
  					return <p>{p}</p>;
  			})
  		}

    render(){
      return (

        <center>
        <article class="mt8 mw7 pb3 pa3">
          <h1 class="avenir fw1 f2 pb3 ph3">{this.props.location.state.name}</h1>
          <img src={this.props.location.state.img} class="w-75" alt="Photo of outer space"/>

          <p class="tl mt5-l lh-copy">
            {this.handleParagraphs(this.props.location.state.description)}
          </p>
          <div class="tl lh-copy">
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
Eventx.propTypes = {
   name: PropTypes.string,
	 img: PropTypes.string,
   cost: PropTypes.string,
   description: PropTypes.string,
   location: PropTypes.string,
   time: PropTypes.string,
	 children: PropTypes.node
};

export default Eventx;

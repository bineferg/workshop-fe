import React , {Component} from 'react';

class ReactFormLabel extends Component {
 constructor() {
  super();
 }

 render() {
  return(
   <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
  )
 }
}

export default ReactFormLabel; 

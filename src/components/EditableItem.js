import React from 'react';
import thumb from '../assets/test.jpg';
import ContentEditable from 'react-wysiwyg';
import PropTypes from 'prop-types';

class EditableItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: this.props.data,
      editing: false
    };
    this.enableEditing = this.enableEditing.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onChange(text) {
     // in order to render the updated text,
     // you need to pass it as a prop to contentEditable.
     // This gives you increased flexibility.
     this.setState({ text: text });
   }

   enableEditing(){
     // set your contenteditable field into editing mode.
     this.setState({ editing: true });
   }


  render(){
     return (
       <div>
         <ContentEditable
           tagName='div'
           className='name-field'
           onChange={this.onChange}
           text={this.state.text}
           placeholder={this.props.data}
           autofocus={true}
           maxLength={200}
           editing={this.state.editing}
         />
         <button onClick={ () =>this.enableEditing(this.state.text)}>
           Enable Editing
         </button>
       </div>
     );
   }
}

EditableItem.propTypes = {
	 text: PropTypes.string,
};
export default EditableItem;

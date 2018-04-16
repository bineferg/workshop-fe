import React from 'react';
import ShowMoreText from 'react-show-more-text';
import { Form, Input, Upload, Modal, Icon } from 'antd';

const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events";
const FormItem = Form.Item;
const { TextArea } = Input;
const imageURL = "https://workshop-objects-1.s3.amazonaws.com/events/";
const defaultLocation = "ForsterStrasse 51"

class AdminEventList extends React.Component {
  constructor(props) {
		super(props);
    this.executeOnClick = this.executeOnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleEditField = this.handleEditField.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.state = {
    previewVisible: false,
    previewImage: '',
    fileListMap: this.props.fileListMap,
    editing: '',
    };
	}


  executeOnClick(isExpanded) {}

  handleDelete(id) {
    fetch(eventsURL + '?event_id=' + id, {
    method: 'delete'
    })
    .then(response => response.json())
    .catch (function (error) {
			console.log('Request failed', error);
			return
    });
  }

  /* handle image and upload functionality*/
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.state.fileListMap[fileList.uid] = fileList;

  handleCancelEdit(){
    this.setState({editing:''});
  }


  handleWorkshopUpdate( update ) {
    console.log("update", update)
  }

  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let target = event.target,
          update = {};

      update.id = this.state.editing;
      update[ target.name ] = target.value;

      this.handleWorkshopUpdate( update );
    }
  }

  toggleEditing( itemId ) {
    return this.setState( { editing: itemId } );
  }

  renderOrEditItem(d){

    var previewVisible = this.state.previewVisible;
    var previewImage = this.state.previewImage;
    const fileList = this.state.fileListMap[d.id];

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    var imgName=imageURL+d.id+".jpg"

    if ( this.state.editing === d.id ) {
      return(
      <div>
      <article className="dt w-100 b--black-05 pb2 mt2">
          <div className="dtc w2 w3-ns">
          <h1 className="f6 f5-ns fw6 lh-title black">ID </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.id }` }
              name="id"
              defaultValue={ d.id }
            />
          </div>
          <div className="dtc w8">
          <h1 className="f6 f5-ns fw6 lh-title black">Title </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.name }` }
              name="title"
              defaultValue={ d.name }
            />
          </div>
          <div className="dtc w8">
          <h1 className="f6 f5-ns fw6 lh-title black">Time </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.time }` }
              name="title"
              defaultValue={ d.time }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Cost </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.cost }` }
              name="title"
              defaultValue={ d.cost }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Location </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.location }` }
              name="title"
              defaultValue={ d.location }
            />
          </div>
          </article>
          <article className="dt w-100 bb b--black-05 pb2 mt2">

          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black ">Description </h1>
            <TextArea
              onKeyDown={ this.handleEditField }
              autosize={{ minRows: 10, maxRows: 1000 }}
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.description }` }
              name="title"
              defaultValue={ d.description }
            />
          </div>
          <div className="clearfix dtc pl3">
          <h1 className="f6 f5-ns fw6 lh-title black">Event Image</h1>
         <Upload
           action="//jsonplaceholder.typicode.com/posts/"
           listType="picture-card"
           fileList={fileList}
           onPreview={this.handlePreview}
           onChange={this.handleChange}
         >
           {fileList.length >= 3 ? null : uploadButton}
         </Upload>
         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
           <img alt="example" style={{ width: '100%' }} src={previewImage} />
         </Modal>
       </div>
          <div className="pb3 pt3">
          <button className="f6 button-reset ba b--black-10 dim pointer pv2 pa2 black-60 bg-green" onClick={ this.handleUpdateItem } label="Update Item"> Update </button>
          </div>
          <div className="pb3">
          <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv2 pa2 white-80" onClick={ this.handleCancelEdit } label="Cancel Edit"> Cancel </button>
          </div>
      </article>
      </div>
    );
    } else {
      return (
        <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
       <div className="dtc w2 w3-ns ">
        <h1 className="f6 f5-ns fw6 lh-title black ">Image </h1>
         <img src={imgName} className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
       </div>
       <div className="dtc pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">ID </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.id}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Title</h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.name}</h2>
       </div>
       <div className="dtc pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Description </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">
         <ShowMoreText
               lines={3}
               more='Show more'
               less='Show less'
               anchorClass=''
               onClick={this.executeOnClick(true)}>
               {d.description}
         </ShowMoreText>
         </h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Time </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.time}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Cost </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.cost}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Location </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.location}</h2>
       </div>
       <div className="dtc ">
         <form className="w-100 tr pr3">
           <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit" onClick={ this.toggleEditing.bind( null, d.id ) }>+ Edit</button>
         </form>
         <form className="w-100 tr pr3">
           <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv1 white-80" type="submit" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(d.id) } }>- Delete</button>
         </form>
       </div>
      </article>
    );}

  }

  render(){
    return (
      <div className="mw8 pb5 center">
        {this.props.data.map((item) => this.renderOrEditItem(item))}
      </div>
    );
  }

}

export default AdminEventList;

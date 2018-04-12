import React from 'react';
import ShowMoreText from 'react-show-more-text';
import { Form, Input, Icon, Upload, Modal } from 'antd';

const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const imageURL = "https://workshop-objects-1.s3.amazonaws.com/workshops/";
const FormItem = Form.Item;
const { TextArea } = Input;

class AdminWorkshopList extends React.Component {

  constructor(props) {
		super(props);
    this.renderItem = this.renderItem.bind(this);
    this.executeOnClick = this.executeOnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.executeOnClick = this.executeOnClick.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.state = {
    previewVisible: false,
    previewImage: '',
    fileListMap: this.props.fileListMap,
    editing: '',
    };
	}


  executeOnClick(isExpanded) {}

  handleDelete(id) {
    /*fetch(workshopURL + '?workshop_id=' + id, {
    method: 'delete'
    })
    .then(response => response.json());*/
    console.log(id);
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.state.fileListMap[fileList.uid] = fileList;


  handleEventUpdate( update ) {
    console.log("update")
  }

  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let target = event.target,
          update = {};

      update.id = this.state.editing;
      update[ target.name ] = target.value;

      this.handleUpdate( update );
    }
  }

  toggleEditing( itemId ) {
    return this.setState( { editing: itemId } );
  }

  renderOrEditItem(d){

    var previewVisible = this.state.previewVisible;
    var previewImage = this.state.previewImage;
    const fileList = this.state.fileListMap[d.WorkshopID];

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    var imgName=imageURL+d.WorkshopID+".jpg"

    if ( this.state.editing === d.WorkshopID ) {
      console.log(this.state.fileListMap);
      return(
      <div>
      <article className="dt w-100 b--black-05 pb2 mt2">
          <div className="dtc w2 w3-ns">
          <h1 className="f6 f5-ns fw6 lh-title black">ID </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.WorkshopID }` }
              name="id"
              defaultValue={ d.WorkshopID }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Title </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Name }` }
              name="title"
              defaultValue={ d.Name }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Time </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Time }` }
              name="title"
              defaultValue={ d.Time }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Cost </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Cost }` }
              name="title"
              defaultValue={ d.Cost }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Cap </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Cap }` }
              name="title"
              defaultValue={ d.Cap }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Location </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Location }` }
              name="title"
              defaultValue={ d.Location }
            />
          </div>
          </article>
          <article className="dt w-100 bb b--black-05 pb2 mt2">

          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black ">Description </h1>
            <TextArea
              onKeyDown={ this.handleEditField }
              autosize={{ maxRows: 1000 }}
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Description }` }
              name="title"
              defaultValue={ d.Description }
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
          <div>
          <button onClick={ this.handleEditItem } label="Update Item"> Update </button>
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
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.WorkshopID}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Title</h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.Name}</h2>
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
               {d.Description}
         </ShowMoreText>
         </h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Time </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.Time}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Cost </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.Cost}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Cap </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.Cap}</h2>
       </div>
       <div className="dtc  pl2">
         <h1 className="f6 f5-ns fw6 lh-title black ">Location </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">{d.Location}</h2>
       </div>
       <div className="dtc ">
         <form className="w-100 tr pr3">
           <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit" onClick={ this.toggleEditing.bind( null, d.WorkshopID ) }>+ Edit</button>
         </form>
         <form className="w-100 tr pr3">
           <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv1 white-80" type="submit" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(d.WorkshopID) } }>- Delete</button>
         </form>
       </div>
      </article>
    );}

  }



  renderItem(d){
    var imgName="https://workshop-objects-1.s3.amazonaws.com/workshops/"+d.WorkshopID+".jpg"
    return(
    <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
     <div className="dtc w2 w3-ns ">
      <h1 className="f6 f5-ns fw6 lh-title black ">Image </h1>
       <img src={imgName} className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
     </div>
     <div className="dtc pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">ID </h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">{d.WorkshopID}</h2>
     </div>
     <div className="dtc  pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">Title</h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">{d.Name}</h2>
     </div>
     <div className="dtc pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">Description </h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">
       <ShowMoreText
             lines={3}
             more='Show more'
             less='Show less'
             anchorClass=''
             onClick={this.executeOnClick(true)}>
             {d.Description}
       </ShowMoreText>
       </h2>
     </div>
     <div className="dtc  pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">Time </h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">{d.Time}</h2>
     </div>
     <div className="dtc  pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">Cost </h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">{d.Cost}</h2>
     </div>
     <div className="dtc  pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">Cap </h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">{d.Cap}</h2>
     </div>
     <div className="dtc  pl2">
       <h1 className="f6 f5-ns fw6 lh-title black ">Location </h1>
       <h2 class="f6 fw4 mt0 mb0 black-60">{d.Location}</h2>
     </div>
     <div className="dtc ">
       <form className="w-100 tr pr3">
         <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Edit</button>
       </form>
       <form className="w-100 tr v-bottom pr3">
         <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv1 white-80" type="submit" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(d.id) } }>- Delete</button>
       </form>
     </div>
    </article>

  );}

  render(){
    return (
    <div className="mw8 pb5 center">
    {this.props.data.map((item) => this.renderOrEditItem(item))}
   </div>
 );
  }

}

export default AdminWorkshopList;

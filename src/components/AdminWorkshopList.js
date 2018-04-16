import React from 'react';
import ShowMoreText from 'react-show-more-text';
import { Form, Input, Icon, Upload, Modal } from 'antd';

const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const imageURL = "https://workshop-objects-1.s3.amazonaws.com/workshops/";
const FormItem = Form.Item;
const { TextArea } = Input;
const defaultLocation = "ForsterStrasse 51"

class AdminWorkshopList extends React.Component {

  constructor(props) {
		super(props);
    this.renderItem = this.renderItem.bind(this);
    this.executeOnClick = this.executeOnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.executeOnClick = this.executeOnClick.bind(this);
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
    fetch(workshopURL + '?workshop_id=' + id, {
    method: 'delete'
    })
    .then(response => response.json())
    .catch (function (error) {
			console.log('Request failed', error);
			return
    });
  }
  handleCancelEdit(){
    this.setState({editing:''});
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.state.fileListMap[fileList.uid] = fileList;

  handleUpdateItem= (e) => {
    console.log(e)
   let newState = {};
   for (var key in e.target) {
     newState[key.name] = e.target[key].value;
   }
   this.setState(newState);
   var payload = {
     workshop_id: this.state.workshopID,
     Name: this.state.workshopName,
     Description: this.state.description,
     Time : this.state.workshopTimes,
     Cost: this.state.workshopCost,
     Cap: parseInt(this.state.workshopCap),
     Location: defaultLocation,
   }
   console.log(payload);

   /*fetch(workshopURL, {
   method: 'PUT',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
   body: JSON.stringify(payload)
   }).then((response) => {
       if (response.ok) {
         this.setState({createSuccess: true})
       }
   })
   .catch(function(error){
     console.log('Request failed', error);
     return;
   });*/
 };


  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let target = event.target,
          update = {};

      update.id = this.state.editing;
      update[ target.name ] = target.value;

      /*this.handleUpdate( update );*/
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
      return(
      <div>
      <article className="dt w-100 b--black-05 pb2 mt2">
          <div className="dtc w2 w3-ns">
          <h1 className="f6 f5-ns fw6 lh-title black">ID </h1>
            <h2 className="f6 fw4 mt0 mb0 black-60">{d.WorkshopID}</h2>
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Title </h1>
            <Input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Name }` }
              name="name"
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
              name="time"
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
              name="cost"
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
              name="cap"
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
              name="location"
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
              name="description"
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

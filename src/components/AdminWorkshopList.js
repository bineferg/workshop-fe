import React from 'react';
import ShowMoreText from 'react-show-more-text';
import Dropzone from 'react-dropzone';
import trashcan from '../assets/trashcan.png';
import { Form, Input, Icon, Upload, Modal } from 'antd';

const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops";
const uploadURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/upload";
const imageURL = "https://workshop-objects-1.s3.amazonaws.com/workshops/";
const FormItem = Form.Item;
const { TextArea } = Input;
const defaultLocation = "ForsterStrasse 51"

class AdminWorkshopList extends React.Component {

  constructor(props) {
		super(props);
    this.executeOnClick = this.executeOnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleEditField = this.handleEditField.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.state = {
      fileListMap: this.props.fileListMap,
      editing: '',
    };
	}

  removePhoto = (e, id) => {
      e.stopPropagation();
      var fileListMap = this.state.fileListMap;
      fileListMap[id] = [];
      this.setState({filListMap: fileListMap})
    }

  handlePhotoChange = (files, id) => {
      var fileListMap = this.state.fileListMap
      fileListMap[id] = files
      this.setState({fileListMap: fileListMap, fileChanged: true})
  }

  handlePreview(file){
    if(file.url){
      return file.url
    }
    return file.preview
  }

  executeOnClick(isExpanded) {}

  handleDelete = (id) => {
      this.setState({
        deleting: true
      })
      console.log(id)
      fetch(workshopURL + '?workshop_id=' + id, {
      method: 'delete',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(success => this.setState({
        deleting: false,
      }))
      .catch (function (error) {
  			console.log(error)
      });
      this.setState({
        deleted: true,
      })
  }

  handleCancelEdit(){
    this.setState({editing:''});
  }

  putPhotoCall(files, id){
    if(!this.state.fileChanged){
      this.setState({photoCall: true})
    }

    return new Promise(() => {
      fetch(uploadURL + '/workshops/'+ id+'.jpg', {
          method:'GET',
        })
        .then(d => d.json())
        .then((d) => {
          fetch(d.url, {
            method: 'PUT',
            body: files[0]
          })
          .then((response) => {
            if(response.ok){
              this.setState({photoCall: true})
            }
          })
        })
      }
    )
  }

  updateServerCall(payload){
    return new Promise(() => {
      fetch(workshopURL+ '?workshop_id='+payload.WorkshopID, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).then((response) => {
        if(response.ok){
          this.setState({serverCall: true})
        }
      })
    })
   }


  doAllUpdates(payload, files){
    return Promise.all([this.putPhotoCall(files, payload.WorkshopID), this.updateServerCall(payload)])
  }

  handleUpdateItem(item){
    return event => {
      var payload = {
        WorkshopID: item.WorkshopID,
        name: item.Name,
        description: item.Description,
        cost: item.Cost,
        cap: parseInt(item.Cap, 10),
        time: item.Time,
        location: item.Location,
      }
      console.log(this.state.updated.length)
      for(var i=0; i<this.state.updated.length; i++){
        console.log("in loop")
        var field = this.state.updated[i]

        if (field["Name"]){
          console.log(field["Name"])
          payload.name = field["Name"]
          continue
        }
        if (field["Description"]){
          payload.description = field["Description"]
          continue
        }
        if (field["Cost"]){
          payload.cost=field["Cost"]
          continue
        }
        if (field["Cap"]){
          payload.cap=parseInt(field["Cap"], 10)
          continue
        }
        if (field["Time"]){
          payload.time=field["Time"]
          continue
        }

      }
      payload.location = item.Location

      this.doAllUpdates(payload, this.state.fileListMap[payload.WorkshopID])
      .then(([photoResp, payloadResp]) =>{
        console.log(photoResp, payloadResp)
      })
    }
 }


  handleEditField(event ) {
      let target = event.target,
      update = {};

      /* set id */
      update.id = this.state.editing;
      update[ target.name ] = target.value;
      if(this.state.updated.length === 0) {
        this.state.updated.push(update)
        return
      }
      var newUpdated = new Array()
      newUpdated.push(update)
      for(var i=0; i<this.state.updated.length; i++){
        var field = this.state.updated[i]
        if (field[target.name]){
            continue
        }
        newUpdated.push(field)
      }
      this.setState({updated: newUpdated})
  }

  toggleEditing( itemId ) {
    return this.setState( { editing: itemId, updated: new Array() } );
  }

  renderOrEditItem(d){
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
              name="Name"
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
              name="Time"
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
              name="Cost"
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
              name="Cap"
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
              name="Location"
              defaultValue={ d.Location }
            />
          </div>
          </article>
          <article className="dt w-100 bb b--black-05 pb2 mt2">
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black ">Caption </h1>
            <TextArea
              onKeyDown={ this.handleEditField }
              autosize={{ maxRows: 10 }}
              maxlength="400"
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Caption }` }
              name="Caption"
              defaultValue={ d.Caption }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black ">Description </h1>
            <TextArea
              onKeyDown={ this.handleEditField }
              autosize={{ maxRows: 1000 }}
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.Description }` }
              name="Description"
              defaultValue={ d.Description }
            />
          </div>
          <div className="clearfix dtc pl3">
          <h1 className="f6 f5-ns fw6 lh-title black">Event Image</h1>
          <Dropzone
            onDrop={ (files) => this.handlePhotoChange(files, d.WorkshopID) }
            className="uploadBox"
          >
          {fileList.length > 0 ? <div>
                <div>
                {fileList.map((file) =>
                    <div>
                    <img src={trashcan} className="uploadImgRm trashIcon" onClick={(e) => this.removePhoto(e, d.WorkshopID)}/>
                      <img src={this.handlePreview(file)} className="uploadBoxPreview" />

                    </div>)}
                </div>
          </div> : uploadButton}
        </Dropzone>
         </div>
            <div className="pb3 pt3">
            <button className="f6 button-reset ba b--black-10 dim pointer pv2 pa2 black-60 bg-green" onClick={ this.handleUpdateItem(d) } label="Update Item"> Update </button>
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
         <h1 className="f6 f5-ns fw6 lh-title black ">Caption </h1>
         <h2 className="f6 fw4 mt0 mb0 black-60">
         <ShowMoreText
               lines={3}
               more='Show more'
               less='Show less'
               anchorClass=''
               onClick={this.executeOnClick(true)}>
               {d.Caption}
         </ShowMoreText>
         </h2>
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
           <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv1 white-80" onClick={() => { if (window.confirm('Are you sure you wish to delete this item: ' + d.Name + '?')) this.handleDelete(d.WorkshopID ) } }>- Delete</button>
         </form>
       </div>
      </article>
    );}

  }

  render(){
    if(this.state.deleting){
      return <p>Deleting...</p>
    }
    if(this.state.deleted){
      window.location.reload();
      this.setState({deleted: false})
    }
    if(this.state.photoCall && this.state.serverCall){
      this.setState({updateSuccess: false, photoCall: false, severCall: false, fileChanged: false})
      window.location.reload();
    }

    return (
    <div className="mw8 pb5 center">
    {this.props.data.map((item) => this.renderOrEditItem(item))}
   </div>
 );
  }

}

export default AdminWorkshopList;

import React from 'react';
import ShowMoreText from 'react-show-more-text';
import Dropzone from 'react-dropzone';
import trashcan from '../assets/trashcan.png';

const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events";
const uploadURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/upload";
const imageURL = "https://workshop-objects-1.s3.amazonaws.com/events/";
const defaultLocation = "ForsterStrasse 51"

class AdminEventList extends React.Component {
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

  executeOnClick(isExpanded) {

  }

  handleCancelEdit(){
    this.setState({editing:''});
  }

  handleDelete(id) {
    this.setState({
      deleting: true
    })
    fetch(eventsURL + '?event_id=' + id, {
    method: 'DELETE'
    })
    .then(success => this.setState({
      deleting: false,
    }))
    .catch (function (error) {
			console.log('Request failed', error);
    });
    this.setState({
      deleted: true,
    })
  }
  putPhotoCall(files, id){
    if(!this.state.fileChanged){
      this.setState({photoCall: true})
    }
    return new Promise (() => {
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
            this.setState({photoCall: true})
          })
        })
    })
  }

  updateServerCall(payload){
    return new Promise (() =>{
      fetch(eventsURL+ '?id='+payload.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      .then((response) => {
        this.setState({serverCall: true})
       })
    })
   }


  doAllUpdates(payload, files){
    return Promise.all([this.putPhotoCall(files, payload.id), this.updateServerCall(payload)])
  }

  handleUpdateItem(item){
    return event => {
      var payload = {
        id: item.id,
        name: item.name,
        description: item.description,
        cost: item.cost,
        time: item.time,
        location: item.location,
      }

      for(var i=0; i<this.state.updated.length; i++){
        var field = this.state.updated[i]

        if (field["name"]){
          payload.name = field["name"]
          continue
        }
        if (field["description"]){
          payload.description = field["description"]
          continue
        }
        if (field["cost"]){
          payload.cost=field["cost"]
          continue
        }
        if (field["time"]){
          payload.time=field["time"]
          continue
        }

      }
      payload.location = item.location
      payload.id = item.id

    this.doAllUpdates(payload, this.state.fileListMap[payload.id])
    .then(([photoResp, payloadResp]) =>{
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
    const fileList = this.state.fileListMap[d.id];
    const uploadButton = (
      <div>
        // Used to be an Icon
        <span>+</span>
        //<div className="ant-upload-text">Upload</div>
        <div>
         <label for="text">Upload text:</label>
         <input type="file" name="text" />
        </div>
      </div>
    );

    var imgName=imageURL+d.id+".jpg"

    if ( this.state.editing === d.id ) {
      return(
      <div>
      <article className="dt w-100 b--black-05 pb2 mt2">
          <div className="dtc w2 w3-ns">
          <h1 className="f6 f5-ns fw6 lh-title black">ID </h1>
            <h2 className="f6 fw4 mt0 mb0 black-60">{d.id}</h2>
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Title </h1>
            <input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.name }` }
              name="name"
              defaultValue={ d.name }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Time </h1>
            <input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.time }` }
              name="time"
              defaultValue={ d.time }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Cost </h1>
            <input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.cost }` }
              name="cost"
              defaultValue={ d.cost }
            />
          </div>
          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black">Location </h1>
            <input
              onKeyDown={ this.handleEditField }
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.location }` }
              name="location"
              defaultValue={ d.location }
            />
          </div>
          </article>
          <article className="dt w-100 bb b--black-05 pb2 mt2">

          <div className="dtc">
          <h1 className="f6 f5-ns fw6 lh-title black ">Description </h1>
            <textarea
              onKeyDown={ this.handleEditField }
              autosize={{ maxRows: 1000 }}
              type="text"
              className="f6 mb2 mr5"
              ref={ `title_${ d.description }` }
              name="description"
              defaultValue={ d.description }
            />
          </div>
          <div className="clearfix dtc pl3">
          <h1 className="f6 f5-ns fw6 lh-title black">Event Image</h1>
          <Dropzone
            onDrop={ (files) => this.handlePhotoChange(files, d.id) }
            className="uploadBox"
          >
          {fileList.length > 0 ? <div>
                <div>
                {fileList.map((file) =>
                    <div>
                    <img src={trashcan} className="uploadImgRm trashIcon" onClick={(e) => this.removePhoto(e, d.id)}/>
                      <img src={this.handlePreview(file)} className="uploadBoxPreview" />

                    </div>)}
                </div>
          </div> : uploadButton}
        </Dropzone>
         </div>
            <div className="pb3 pt3">
            <button className="f6 button-reset ba b--black-10 dim pointer pv2 pa2 black-60 bg-green" onClick={ this.handleUpdateItem(d) } label="Update" />
            </div>
            <div className="pb3">
            <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv2 pa2 white-80" onClick={ this.handleCancelEdit } label="Cancel" />
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
           <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit" onClick={ this.toggleEditing.bind(null, d.id ) }>+ Edit</button>
         </form>
         <form className="w-100 tr pr3">
           <button className="f6 button-reset bg-red ba b--black-10 dim pointer pv1 white-80" type="submit" onClick={() => { if (window.confirm('Are you sure you wish to delete this item: ' + d.name + '?')) this.handleDelete(d.id) } }>- Delete</button>
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

export default AdminEventList;

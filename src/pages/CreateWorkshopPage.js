import React from 'react';
import { Icon, Form, Input, Button, Modal} from 'antd';
import Dropzone from 'react-dropzone';
import 'antd/dist/antd.css';
import trashcan from '../assets/trashcan.png';
import randomstring from 'randomstring';

const FormItem = Form.Item;
const { TextArea } = Input;
const workshopsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const uploadURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/upload"
const defaultLocation = "ForsterStrasse 51"


class CreateEventPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: []
    };
  }

  handleChange = (e) => {
   let newState = {};
   newState[e.target.name] = e.target.value;
   this.setState(newState);
  };

  handlePhotoChange = (files) => {
    this.setState({fileList: files})
  }
  removePhoto = (e) => {
    e.stopPropagation();
    this.setState({fileList: []})
  }

  putPhotoCall(files, id){
    return new Promise (() => {
      fetch(uploadURL + '/workshops/'+ id+'.jpg', {
        method:'GET',
      })
      .then(d => d.json())
      .then((d) => {
        fetch(d.url, {
          method: 'PUT',
          body: files[0],
        })
        .then((response) => {
          if(response.ok) {
            this.setState({photoCall: true})
          }
        })
      })
    })
  }

  doServerCall(payload){
    return new Promise (() => {
      fetch(workshopsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
        }).then((response) => {
          if(response.ok) {
            this.setState({serverCall: true})
          }
        })
    })
   }


  makeNewWorkshop(payload, files){
    return Promise.all([this.putPhotoCall(files, payload.workshop_id), this.doServerCall(payload)])
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.fileList)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    var payload = {
      workshop_id: randomstring.generate(7),
      name: this.state.workshopName,
      description: this.state.description,
      time : this.state.workshopTimes,
      cost: this.state.workshopCost,
      cap: parseInt(this.state.workshopCap, 10),
      location: defaultLocation,
    }
      this.makeNewWorkshop(payload, this.state.fileList)
    }



  render() {
    const { fileList} = this.state;
    const uploadButton = (
      <div className="db tc mt5">
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    if (this.state.photoCall && this.state.serverCall ){
      this.setState({photoCall: false, serverCall: false})
      return (
      <div>
          <h1 className="plr5 f2 mb4 fw1 avenir mt10">Workshop Published!</h1>
          <br/>
          <button className="ph3 pv2 logo-green-bg ml3 grow no-underline ba b--black f6" onClick={ () => window.location.reload()}>Admin Center</button>
      </div>
    )
    }
    return (
      <div className=" pb5 pt6 bg-near-white">
      <div className="mt10 fl">
      <button className="ph3 pv2 logo-green-bg ml3 grow no-underline ba b--black f6" onClick={ () => window.location.reload()}>Admin Center</button>
      </div>
      <center>
      <h2 className="avenir fw1 f1-5 mb0 mr10">Create Workshop</h2>
      </center>
      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Workshop Name" required="true" >
          <Input name="workshopName" placeholder="Title of Workshop" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Description" name="description" required="true">
            <TextArea placeholder="Use [p] to delineate paragraphs!" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="description"/>
        </FormItem>
        <FormItem label="Workshop Times" required="true" >
          <Input name="workshopTimes" placeholder="Time of the workshop" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Cost" required="true" >
          <Input name="workshopCost" placeholder="5 EU" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Cap" required="true" >
          <Input name="workshopCap" placeholder="25" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem  className="fr pt4">
          <Button className="bg-green" type="default" htmlType="submit" onClick={this.handleSubmit}>Submit</Button>
        </FormItem>
        <div className="mb5">
        <Dropzone
          onDrop={ this.handlePhotoChange }
          className="uploadBox"
        >
        {this.state.fileList.length > 0 ? <div>
              <div>
              {this.state.fileList.map((file) =>
                  <div>
                  <img src={trashcan} className="uploadImgRm trashIcon" onClick={this.removePhoto}/>
                    <img src={file.preview} className="uploadBoxPreview" />

                  </div>)}
              </div>
        </div> : uploadButton}
      </Dropzone>
     </div>
      </Form>

      </div>

      </div>
    );
  }
}

export default Form.create()(CreateEventPage);

import React from 'react';
import { Icon, Form, Input, Button} from 'antd';
import { Spin} from 'antd';
import 'antd/dist/antd.css';
import trashcan from '../assets/trashcan.png';
import Dropzone from 'react-dropzone';

import randomstring from 'randomstring';

const FormItem = Form.Item;
const { TextArea } = Input;
const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"
const uploadURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/upload"
const defaultLocation = "Forster Strasse 51"

class CreateEventPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    fileList: [],
    submitSuccess: false
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

  makeEvent(payload, files) {
    fetch(uploadURL + '/events/' + payload.id + '.jpg', {
      method: 'GET',
    }).then(d => d.json())
    .then((d) => {
      fetch(d.url, {
        method: 'PUT',
        body: files[0]
      }).then((response) => {
        if(response.ok) {
          fetch(eventsURL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
          }).then((response) => {
              if(response.ok){
                this.setState({
                  submitSuccess: true,
                  fetching: false,
                  })
              }

          })
        }
      })
    })
}
  handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
  });
  var payload = {
    id: randomstring.generate(7),
    name: this.state.eventName,
    description: this.state.description,
    time : this.state.eventTimes,
    cost: this.state.eventCost,
    location: defaultLocation,
    caption: this.state.caption,
  }
  this.setState({fetching: true})
  this.makeEvent(payload, this.state.fileList)

}

  render() {
    const uploadButton = (
      <div className="db tc mt5">
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    if(this.state.fetching){
      return(
        <div className="mt10 plr5 mb5">
        <Spin tip="..." size="large">
        </Spin>
        </div>
      )
    }

    if (this.state.submitSuccess){
      return (<div>
      <h1 className="plr5 f2 mb4 fw1 avenir mt10">Event Published!</h1>
      <br/>
      <div className="ml5 mb5">
      <button className="f6 pointer grow no-underline logo-green-bg ba ph3 pv2 mb4 mt4 dib near-black" onClick={() => window.location.reload()} >
      Admin Center
      </button>
      </div>
      </div>
     )
    }

    return (
      <div className=" pb5 pt6 bg-near-white">
      <div className="mt5 fl pl5">
      <a class="f6 link dim br2 ph4 outline pointer pv2 mb2 dib black bg-white" onClick={ () => window.location.reload()}>Admin Center</a>
      </div>

      <h2 className="avenir fw1 f1-5 mb0 ml24">Create Event</h2>

      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Event Name" required="true" >
          <Input name="eventName" placeholder="Title of Event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Event Description" name="description" required="true">
            <TextArea placeholder="Use [p] to delineate paragraphs!" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="description"/>
        </FormItem>
        <FormItem label="Event Caption" name="caption" required="true">
            <TextArea placeholder="Max character count: 400" maxlength="400" autosize={{ minRows: 4, maxRows: 10 }} onChange={this.handleChange} name="caption"/>
        </FormItem>
        <FormItem label="Event Times" required="true" >
          <Input name="eventTimes" placeholder="Time of event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Event Cost" required="true" >
          <Input name="eventCost" placeholder="Free" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem  className="fr pt4">
          <Button className="bg-green" type="default" htmlType="submit" onClick={this.submitEvent}>Submit</Button>
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

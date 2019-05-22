import React from 'react';
import { Icon, Form, Input, Button} from 'antd';
import { Spin} from 'antd';
import Dropzone from 'react-dropzone';
import 'antd/dist/antd.css';
import trashcan from '../assets/trashcan.png';
import randomstring from 'randomstring';

const FormItem = Form.Item;
const { TextArea } = Input;
const workshopsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const uploadURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/upload"
const defaultLocation = "Forster Strasse 51"


class CreateWorkshopPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      submitSuccess: false,
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

  makeWorkshop(payload, files) {
    fetch(uploadURL + '/workshops/' + payload.workshop_id + '.jpg', {
      method: 'GET',
    }).then(d => d.json())
    .then((d) => {
      fetch(d.url, {
        method: 'PUT',
        body: files[0]
      }).then((response) => {
        if(response.ok) {
          fetch(workshopsURL, {
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
        console.log('Received values of form: ', values, err);
      }
    });
    var payload = {
      workshop_id: randomstring.generate(7),
      name: this.state.workshopName,
      description: this.state.description,
      time : this.state.workshopTimes,
      cost: this.state.workshopCost,
      caption: this.state.caption,
      cap: parseInt(this.state.workshopCap, 10),
      location: defaultLocation,
    }
      this.setState({fetching: true})
      this.makeWorkshop(payload, this.state.fileList)
    }



  render() {
    const { fileList} = this.state;
    const uploadButton = (
      <div className="db tc mt5">
        <Icon type="plus"/>
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
      return (
      <div>
      <h1 className="plr5 f2 mb4 fw1 avenir mt10">Workshop Published!</h1>
      <br/>
      <div className="ml5 mb5">
      <button className="f6 grow pointer no-underline logo-blue-bg ba ph3 pv2 mb4 mt4 dib near-black" onClick={() => window.location.reload()} >
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
      <h2 className="avenir fw1 f1-5 mb0 ml26">Create Workshop</h2>
      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Workshop Name" required="true" >
          <Input name="workshopName" placeholder="Title of Workshop" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Caption" name="caption" required="true">
            <TextArea placeholder="Max character count: 400" maxlength="400" autosize={{ minRows: 4, maxRows: 10 }} onChange={this.handleChange} name="caption"/>
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

export default Form.create()(CreateWorkshopPage);

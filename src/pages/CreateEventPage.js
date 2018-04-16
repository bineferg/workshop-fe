import React from 'react';
import { Icon, Form, Input, Button, Upload, Modal} from 'antd';
import 'antd/dist/antd.css';
import randomstring from 'randomstring';

const FormItem = Form.Item;
const { TextArea } = Input;
const eventsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/events"
const defaultLocation = "ForsterStrasse 51"


class CreateEventPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = (e) => {
   let newState = {};

   newState[e.target.name] = e.target.value;

   this.setState(newState);
   console.log(this.state);
  };

  /*handleChange = ({ fileList }) => this.setState({ fileList })*/

  handleCancel = () => this.setState({ previewVisible: false })


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
  }

  fetch(eventsURL, {
  method: 'POST',
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
  });
}
normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}


  render() {

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className=" pb5 pt6 bg-near-white">
      <div className="mt10 fl">
      <button className="ph3 pv2 bg-white ml3 pointer no-underline ba b--black link f6" onClick={ () => window.location.reload()}>Admin Center</button>
      </div>
      <center>
      <h2 className="avenir fw1 f1-5 mb0 mr10">Create Event</h2>
      </center>
      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Event Name" required="true" >
          <Input name="eventName" placeholder="Title of Event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Event Description" name="description" required="true">
            <TextArea placeholder="Use [p] to delineate paragraphs!" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="description"/>
        </FormItem>
        <FormItem label="Event Times" required="true" >
          <Input name="eventTimes" placeholder="Time of event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Event Cost" required="true" >
          <Input name="eventCost" placeholder="Free" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem  className="fr pt4">
          <Button className="bg-green" type="default" htmlType="submit">Submit</Button>
        </FormItem>
        <div className="clearfix">
        <p className="black">Event Image:</p>
       <Upload
         action="//jsonplaceholder.typicode.com/posts/"
         listType="picture-card"
         fileList={fileList}
         onPreview={this.handlePreview}
         onChange={this.handleChange}
       >
         {!fileList ? null : uploadButton}
       </Upload>
       <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
         <img alt="example" style={{ width: '100%' }} src={previewImage} />
       </Modal>
     </div>



      </Form>

      </div>

      </div>
    );
  }


}
export default Form.create()(CreateEventPage);

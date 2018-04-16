import React from 'react';
import { Icon, Form, Input, Select, InputNumber, Button, Upload, Radio, Modal} from 'antd';
import 'antd/dist/antd.css';
import randomstring from 'randomstring';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const defaultLocation = "ForsterStrasse 51"


class CreateWorkshopPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  }
  handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
  });
  var payload = {
    workshop_id: randomstring.generate(7),
    Name: this.state.workshopName,
    Description: this.state.description,
    Time : this.state.workshopTimes,
    Cost: this.state.workshopCost,
    Cap: parseInt(this.state.workshopCap),
    Location: defaultLocation,
  }

  fetch(workshopURL, {
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
handleChange = (e) => {
 let newState = {};

 newState[e.target.name] = e.target.value;

 this.setState(newState);
 console.log(this.state);
};
handlePreview = (file) => {
  this.setState({
    previewImage: file.url || file.thumbUrl,
    previewVisible: true,
  });
}

/*handleChange = ({ fileList }) => this.setState({ fileList })*/

handleCancel = () => this.setState({ previewVisible: false })

normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

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
      <button className="ph3 pv2 ml3 pointer no-underline ba b--black bg-white link f6" onClick={ () => window.location.reload()}>Admin Center</button>
      </div>
      <center>
      <h2 className="avenir fw1 f1-5 mb0 mr10">Create Workshop</h2>
      </center>
      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Workshop Name" required="true" >
          <Input name="workshopName" placeholder="Title of the workshop" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Description" name="description" required="true">
            <TextArea placeholder="Use [p] to delineate paragraphs!" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="description"/>
        </FormItem>
        <FormItem label="Workshop Times" required="true" >
          <Input name="workshopTimes" placeholder="Time of event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Cost" required="true" >
          <Input name="workshopCost" placeholder="Free" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Cap" required="true" name="workshopCap" >
          <Input required="true" placeholder="25" name="workshopCap" onChange={this.handleChange} />
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
export default Form.create()(CreateWorkshopPage);

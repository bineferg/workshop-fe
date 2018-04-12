import React from 'react';
import { Icon, Form, Input, Select, Button, Upload, Radio, Modal} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;


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
}

handlePreview = (file) => {
  this.setState({
    previewImage: file.url || file.thumbUrl,
    previewVisible: true,
  });
}

handleChange = ({ fileList }) => this.setState({ fileList })

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
      <div className="mt10">
      <div className="fl">
      <button className="ph3 pv2 ml3 pointer no-underline ba b--black bg-transparent link f6" onClick={ () => window.location.reload()}>Admin Center</button>
      </div>
      <center>
      <h2 className="avenir fw1 f1-5 mb0 mr10">Create Workshop</h2>
      <p>There is very little input validation here so just keep that in mind :) </p>
      </center>
      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Workshop Name" required="true" >
          <Input name="eventName" placeholder="Title of the workshop" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Description" name="comments" required="true">
            <TextArea placeholder="Use [p] to delineate paragraphs!" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="comments"/>
        </FormItem>
        <FormItem label="Workshop Times" required="true" >
          <Input name="eventTimes" placeholder="Time of event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Cost" required="true" >
          <Input name="eventCost" placeholder="Free" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Workshop Cap" required="true" >
          <Input name="eventCost" placeholder="25" required="true" onChange={this.handleChange} />
        </FormItem>

        <div className="clearfix">
        <p className="black">Workshop Image:</p>
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


        <FormItem className="">
          <Button type="default" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>

      </div>
      </div>
    );
  }


}
export default Form.create()(CreateWorkshopPage);

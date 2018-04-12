import React from 'react';
import { Icon, Form, Input, Button, Upload, Modal} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
const { TextArea } = Input;


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

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleCancel = () => this.setState({ previewVisible: false })


  handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
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
      <div className="mt10">
      <div className="fl">
      <button className="ph3 pv2 ml3 pointer no-underline ba b--black bg-transparent link f6" onClick={ () => window.location.reload()}>Admin Center</button>
      </div>
      <center>
      <h2 className="avenir fw1 f1-5 mb0 mr10">Create Event</h2>
      <p>There is very little input validation here so just keep that in mind :) </p>
      </center>
      <div className="w-80">

      <Form onSubmit={this.handleSubmit} className="pa4 pl8">
        <FormItem label="Event Name" required="true" >
          <Input name="eventName" placeholder="Title of Event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Event Description" name="comments" required="true">
            <TextArea placeholder="Use [p] to delineate paragraphs!" autosize={{ minRows: 8, maxRows: 1000 }} onChange={this.handleChange} name="comments"/>
        </FormItem>
        <FormItem label="Event Times" required="true" >
          <Input name="eventTimes" placeholder="Time of event" required="true" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Event Cost" required="true" >
          <Input name="eventCost" placeholder="Free" required="true" onChange={this.handleChange} />
        </FormItem>
        <span className="db">
        <div className="clearfix">
        <p className="black">Event Image:</p>
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

        <FormItem>
          <Button type="default" htmlType="submit">Submit</Button>
        </FormItem>
          </span>
      </Form>

      </div>

      </div>
    );
  }


}
export default Form.create()(CreateEventPage);

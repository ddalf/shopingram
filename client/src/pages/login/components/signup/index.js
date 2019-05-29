import React from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
import Style from './index.scss'
import API from '@common/api.js'
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
    this.handleSubmit.bind(this)
  }

  
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let response = await API.register(values)
        notification[response.data.flag? 'success' : 'error']({
          message: response.message
        })
        this.props.toggleSign()
      }
    });
  }

  onChangeHandler (type, event) {
    this.setState({
      [type+'Empty']: event.target.value!== ''
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={Style.signup}>
        <h1 className="header">
          <span className="instagram"></span>
        </h1>
        <h2 className="slogan">sns와 쇼핑을 함께 즐기세요.</h2>
        <div className="or-line">
          <span className="line"></span>
          <span className="name">shoingram signup</span>
          <span className="line"></span>
        </div>
        <Form className="register-form" onSubmit={this.handleSubmit.bind(this)}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <div className={`form-input ${this.state.emailEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'email')}>
                <label htmlFor="label-phone">Email</label>
                <Input id="label-phone" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your userName!' }],
            })(
              <div className={`form-input ${this.state.usernameEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'username')}>
                <label htmlFor="label-username">Name</label>
                <Input id="label-username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <div className={`form-input ${this.state.lockEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'lock')}>
                <label htmlFor="label-lock">Password</label>              
                <Input id="label-lock" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
              </div>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">
              회원가입
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm
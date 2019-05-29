import React from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
import Style from './index.scss'
import API from '@common/api.js'
import store from '@/src/store'
import { withRouter } from 'react-router'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
		if (!err) {
			console.log('Received values of form: ', values);

			let response = await API.login(values)
			notification['success']({
				message: response.message
            })

            this.getUserinfo()
            
            const { history } = this.props;
			setTimeout(() => {
                history.push('/')
			}, 500)
		}
    });
  }

  getUserinfo () {
    API.getUserInfo().then(response => {
        store.dispatch({
            type: 'ADD_USERINFO',
            info: response.data
        })
    })
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
        <Form className="sigin-form" onSubmit={this.handleSubmit.bind(this)}>
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
              로그인
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm)
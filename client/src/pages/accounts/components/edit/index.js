import React from 'react'
import { Form, Input, Select, Button, AutoComplete, notification } from 'antd';
import Style from './index.scss'
import API from '@common/api.js'
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import Upload from '@components/upload'

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    },
    dispatch => {
        return {
            changeUserInfo: info => {
                dispatch({
                    type: "ADD_USERINFO",
                    info
                })
            },
            changeAvatarUrl: info => {
                dispatch({
                    type: "CHANGE_AVATARURL",
                    info
                })
            }
        };
    }
)
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                let params = {}
                Object.keys(values).forEach((index) =>{
                    if (!!values[index]) params[index] = values[index]
                })

                let response = await API.updatePersonalInfo(params);
                notification['success']({
                    message: response.message
                })
                console.log('Received values of form: ', values);
                this.props.changeUserInfo(values)
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    changeAvatarCb = async (avatarUrl) => {
        let info = {
            avatarUrl
        }
        let response = await API.updatePersonalInfo(info);
        notification.success({
            message: response.message
        })
        
        this.props.changeAvatarUrl(info)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 16,
                offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        let {userInfo} = this.props        
        return (
            <section className={Style['edit-accounts']}>
                <Row className="header">
                    <Col span={8}>
                        <span className="avatar fl-right" style = {{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></span>
                    </Col>
                    <Col span={16}  className="user_abstract">
                        <div className={'username'}>{userInfo.account}</div>
                        <div className={'notice'}>프로필 변경<Upload successCb={this.changeAvatarCb} className={'notice'} /></div>
                        
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span className="form-item-label">이름</span>
                        )}
                        >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                            initialValue: userInfo.username
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label={(
                            <span className="form-item-label">웹 사이트</span>
                        )}
                    >
                    {getFieldDecorator('website', {
                        rules: [{ required: false, message: 'Please input website!' }],
                    })(
                        <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                        >
                        <Input />
                        </AutoComplete>
                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                            label={(
                                <span className="form-item-label">자기 소개</span>
                            )}
                        >
                        {getFieldDecorator('abstract', {
                            rules: [{
                                required: false, message: 'Please input your abstract!'
                            }],
                            initialValue: userInfo.abstract
                        })(
                            <TextArea placeholder="Please input your abstract " autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label={(
                            <span className="form-item-label">이메일</span>
                        )}
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }],
                        initialValue: userInfo.email
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                            label={(
                                <span className="form-item-label">전화번호</span>
                            )}
                        >
                        {getFieldDecorator('mobile', {
                            rules: [{ required: false, message: 'Please input your phone number!' }],
                            initialValue: userInfo.mobile
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label={(
                            <span className="form-item-label">성별</span>
                        )}
                    >
                    {getFieldDecorator('sex', {
                        rules: [{ required: false, message: 'Please input your sex!' }],
                        initialValue: userInfo.sex
                    })(
                        <Select>
                            <Option value="남">남</Option>
                            <Option value="여">여</Option>
                        </Select>
                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span className="form-item-label">사업자 등록</span>
                        )}
                        >
                        {getFieldDecorator('businessman', {
                            rules: [{ required: false, message: 'Please input your business num!', whitespace: true }],
                            initialValue: userInfo.businessman
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">수정</Button>
                    </FormItem>
                </Form>
            </section>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm

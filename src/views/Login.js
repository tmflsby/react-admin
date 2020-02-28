import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData, receiveData } from "../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.receiveData(null, 'auth');
  }

  static getDerivedStateFromProps(nextProps) {
    const { auth: nextAuth = {} } = nextProps;
    const LoginComponent = new Login(nextProps);
    if (nextAuth.data && nextAuth.data.uid) {    // 判断是否登陆
      LoginComponent.localStorage.setItem('user', JSON.stringify(nextAuth.data));
      LoginComponent.router.push('/');
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of Form: ', values);
        const { fetchData } = this.props;
        if (values.userName === 'admin' && values.password === 'admin') {
          return fetchData({funcName: 'admin', stateName: 'auth'});
        }
        if (values.userName === 'guest' && values.password === 'guest') {
          return fetchData({funcName: 'guest', stateName: 'auth'});
        }
      }
    });
  };

  gitHub = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3000/&scope=user&state=reactAdmin';
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <div className="login-form">
          <div className="login-logo">
            <span>React Admin</span>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300 }}>
            <Form.Item>
              {
                getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名！'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='user' style={{ fontSize: 13 }}/>}
                         placeholder="管理员输入admin, 游客输入guest"
                         autoComplete='username'
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码！'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                         type="password" placeholder="管理员输入admin, 游客输入guest"
                         autoComplete='current-password'
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住我</Checkbox>
                )
              }
              <a href="#/login" className="login-form-forgot" style={{ float: 'right' }}>忘记密码</a>
              <Button type='primary' htmlType='submit' className='login-form-button' style={{ width: '100%' }}>
                登录
              </Button>
              或<a href="#/login">现在就去注册！</a>
              <p>
                <Icon type="github" onClick={this.gitHub} />(第三方登录)
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.getIn(['httpDataReducer', 'auth'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
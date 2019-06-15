import React,{Component} from 'react'
import './login.less'
import { Form, Icon, Input, Button,} from 'antd'; 
import logo from './images/logo.png'
class Login extends Component {

  handleSubmit = (event) =>{
    event.preventDefault()
    // const username = this.props.form.getFieldValue('username')
    // const password =  this.props.form.getFieldValue('password')
    // const values = this.props.form.getFieldsValue()
    // console.log(username,password,values)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('发送ajsx请求', values);
      }
    });
  }
  validatorPWD = (rule, value='', callback) => {
     value = value.trim()
     if(!value){
      callback('密码不能为空')
     }else if(value.length < 4){
      callback('密码不能小于4位')
     }else if(value.length > 12){
      callback('密码不能大于12位')
     }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须是英文数字或者_')
     }else{
      callback()
     }
         
  }
render(){
  const { getFieldDecorator } = this.props.form;
return (
  <div className="login">
    <header className="login-header">
      <img src={logo} alt="logo"/>
      <h1>React项目：后台管理系统</h1>
    </header>
    <section className="login-content">
      <h2>用户登录</h2>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true,whitespace:true, message: '请输入用户名!' },
                   { min:4, message: '用户名不能小于4位!' },
                   { max:12, message: '用户名不能大于12位!' },
                   { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字或者_!' },
                ] 
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ validator : this.validatorPWD }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
         
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
         
        </Form.Item>
      </Form>
    </section>
  </div>
)
}

}
const WrapLogin = Form.create()(Login);
export default WrapLogin
import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
 
interface IProps{
  login:any
}

class FacebookLoginButton extends React.Component<IProps,{}> {
  public constructor(props:any){
    super(props)
    console.log(this.props)
  }

  public responseFacebook = (response:any) => {
    console.log(response)
    if(response.hasOwnProperty('accessToken')){
      this.props.login(true,response)
    }
  }
 
  public render() {
    return (
      <FacebookLogin
        appId="2373293366050107"
        autoLoad={false}
        fields="name,email,picture"
        textButton = "Please Login with Facebook to Continue"
        callback={this.responseFacebook}
      />
    )
  }
}
 
export default FacebookLoginButton;
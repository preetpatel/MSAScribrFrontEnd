import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
 
interface IProps{
  login:any
}

class FacebookLoginButton extends React.Component<IProps,{}> {
  public constructor(props:any){
    super(props)
  }

  public responseFacebook = (response:any) => {
    if(response.hasOwnProperty('accessToken')){
      const url = "https://graph.facebook.com/v3.3/me?fields=picture.width(700)&access_token=" + response.accessToken
      fetch(url).then(res => { 
        res.json().then((pic:any)=>{
          response.picture.data=pic.picture.data
        })
      })
      this.props.login(true,response)
    }
  }
 
  public render() {
    return (
      <FacebookLogin
        appId="2373293366050107"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,user_photos"
        textButton = "Please Login with Facebook to Continue"
        callback={this.responseFacebook}
      />
    )
  }
}
 
export default FacebookLoginButton;
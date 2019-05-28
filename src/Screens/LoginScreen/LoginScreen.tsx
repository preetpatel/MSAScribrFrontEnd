import * as React from 'react'
import FacebookLoginButton from 'src/Components/FacebookLoginButton';

interface IProps{
    loginHandler:any
}

export default class LoginScreen extends React.Component<IProps,{}> {
    public handleFbLogin = (success:boolean,person:any) => {
        this.props.loginHandler(success,person)
    }

    public render() {
        return (
            <div className="Login Block">
                <h3> Welcome to Scribr</h3>
                <p> Scribr gets the captions for your videos and simplifies the video searching process</p>
                <FacebookLoginButton login={this.handleFbLogin}/>
            </div>
        )
    }
}

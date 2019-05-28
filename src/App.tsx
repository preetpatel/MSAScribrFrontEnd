import * as React from 'react';
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import MainScreen from './Screens/MainScreen/MainScreen';


interface IState{
  loggedIn:boolean,
  person:any,
}

class App extends React.Component<{},IState> {
  public constructor(props:any){
    super(props);
    this.state = {
      loggedIn: false,
      person:{},
    }
  }

  public handleLoginChange = (update:boolean, Person:any) => {
    console.log("called this function with" + update + Person)  
    this.setState({
        loggedIn:update,
        person:Person
      })
  }

  public render() {
      if(this.state.loggedIn === true){
         return <MainScreen/>
      }else{
        return <LoginScreen loginHandler={this.handleLoginChange}/>
      }
  }
}

export default App;

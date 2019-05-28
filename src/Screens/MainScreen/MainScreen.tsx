import * as React from 'react';

interface IProps{
    person:object
}

export default class MainScreen extends React.Component<IProps,{}>{
    public constructor(props:any){
        super(props);
        console.log(this.props)
    }

    public render() {
        return (<div>
            <h1> Hi from main screen </h1>
        </div>)
    }
}
import * as React from 'react';
import SideMenu from 'src/Components/SideMenu'
interface IProps {
    person: object
}

export default class MainScreen extends React.Component<IProps, {}>{
    public constructor(props: any) {
        super(props);
        console.log(this.props)
    }

    public render() {
        return (<div>
            <SideMenu person={this.props.person} />
            <h1> Hi from main screen </h1>
        </div>)
    }
}
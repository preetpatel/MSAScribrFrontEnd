import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import * as React from 'react'
import 'src/App.css'


interface IState {
    open: boolean,
}

interface IProps{
    person:any
}
export default class SideMenu extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props)
        this.state = {
            open: false
        }
    }

    public handleDrawerChange = () => {
        this.setState({ open: !this.state.open})
    }

    public render() {
        return (
            <div className="menuButtonDiv">
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="end"
                    onClick={this.handleDrawerChange}
                    className="menuButton"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    className="drawer"
                    id="drawer"
                    anchor="right"
                    open={this.state.open}
                    onClose = {() => this.handleDrawerChange()}
                >
                    <div>
                        {/*<img className="profileImage" src={this.props.person.picture.data.url}/>*/}
                    </div>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button={true} key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        )
    }
}

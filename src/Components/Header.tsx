import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


export default class Header extends React.Component {

    public render() {
        return (
            <div>
                <h1> Hello from react header </h1>
            </div>
        )
    }
}

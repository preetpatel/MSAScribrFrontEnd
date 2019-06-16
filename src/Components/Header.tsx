import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import LibraryAdd from '@material-ui/icons/LibraryAddRounded'
import * as React from 'react';
import SideMenu from 'src/Components/SideMenu';

interface IProps{
    addVideo:any,
    person:object
}

interface IState{
    input:string
}


export default class Header extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = {
            input:""
        }
    }

    // Probably good to do some checking here but I really cbf
    public addVideo = () =>{            
        this.props.addVideo(this.state.input)
    }

    public render() {
        return (
            <div className="header">
                <TextField
                    id= "Search-Bar"
                    className = "SearchBar"
                    placeholder="Add Video Url"
                    margin="normal"
                    variant="outlined"
                    onChange = { (event: any ) => this.setState({input:event.target.value})}
                    value = {this.state.input}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={this.addVideo}>
                                <LibraryAdd/>
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                <SideMenu person={this.props.person} />
            </div>
        )
    }
}

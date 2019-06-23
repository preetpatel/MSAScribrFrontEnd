import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import * as React from 'react'

interface IState {
    input: string
    result: any
}

export default class CaptionArea extends React.Component<{}, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            input: "",
            result: {
                "videoCount": "2",
                "videos": [
                    {
                        "matchingCaptions": [
                            {
                                "matchingCaption": "Luckily I happen to have a working quantum computer.",
                                "time": "19",
                                "timedURL": "119",
                            }
                        ],
                        "title": "Title of the video",
                        "videoID": "1",
                    },
                    {
                        "matchingCaptions": [
                            {
                                "matchingCaption": "Luckily I happen to have a working quantum .",
                                "time": "19",
                                "timedURL": "219",
                            },
                            {
                                "matchingCaption": "I happen to have a working quantum computer.",
                                "time": "19",
                                "timedURL": "3 19",
                            }
                        ],
                        "title": "Title of the vide o",
                        "videoID": "2",
                    },
                ]
            }
        }
    }

    public search = () => {
        // make call to the api
    }

    public handleTableClick = (timedURL: string) => {
        console.log(timedURL)
    }

    public makeTableBody = (searchObject: any) => {
        const toRet: any[] = [];
        const errorCase = <div><p>Sorry you need to still search</p></div>
        if(!("videos" in searchObject)){
            return errorCase
        }
        searchObject.videos.forEach((video: any) => {
            video.matchingCaptions.forEach((caption: any) => {
                toRet.push(
                    <tr onClick={() => this.handleTableClick(caption.timedURL)}>
                        <td>{caption.time}</td>
                        <td>{caption.matchingCaption}</td>
                        <td>{video.title}</td>
                    </tr>)
            })
        });
        if(toRet.length === 0){
            return errorCase
        }
        return toRet
    }

    public render() {
        return (
            <div className="caption-area">
                <div className="row">
                    <div className="col-2 justify-content-center align-self-center">
                        <h1><span className="red-heading">search</span>caption</h1>
                    </div>
                    <div className="col-10">
                        
                        <TextField
                            id="Search-Bar"
                            className="SearchBar"
                            placeholder="Search Captions"
                            margin="normal"
                            variant="outlined"
                            onChange={(event: any) => this.setState({ input: event.target.value })}
                            value={this.state.input}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={this.search}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>
                </div>
                <br />
                <table className="table">
                    <tr>
                        <th>Time</th>
                        <th>Caption</th>
                        <th>Video</th>
                    </tr>
                    <tbody>
                        {this.makeTableBody(this.state.result)}
                    </tbody>
                </table>
            </div>
        )
    }
}
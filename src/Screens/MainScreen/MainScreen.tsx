import * as React from 'react';
import ReactPlayer from 'react-player'
import CaptionArea from 'src/Components/CaptionArea'
import Header from 'src/Components/Header'
import VideoList from 'src/Components/VideoList'
interface IProps {
    person: object
}

interface IState {
    listCallback: any,
    player: any,
    playingURL: string
    videoList: object
}

export default class MainScreen extends React.Component<IProps, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            listCallback: null,
            player: null,
            playingURL: "https://www.youtube.com/watch?v=5OS_J_mfNYI",
            videoList: [],
        }
        console.log(this.props)
    }

    public setRef = (playerRef: any) => {
        this.setState({
            player: playerRef
        })
    }
    // Never be silly always use arrow functions
    // Object uses hash table under the hood avoid the duplication yo
    public addVideo = (url: string) => {
        fetch("https://msascribrapi.azurewebsites.net/api/Videos", {
            body: "{ \"url\": \""+ url +"\"}",
            headers: {
                Accept: "text/plain",
                "Content-Type": "application/json-patch+json"
            },
            method: "POST"
        }).then(response =>{
            this.state.listCallback.updateList();
        })
    }

    // Better than rerendering the player but if its confusing let me know
    public seek = (time: number) => {
        if (this.state.player !== null) {
            this.state.player.seekTo(time, 'seconds')
        } else {
            console.log("Error Player is still null")
        }
    }

    public updateURL = (url: string) => {
        this.setState({ playingURL: url })
    }

    public listMounted = (callbacks: any) => {
        this.setState({ listCallback: callbacks })
    }

    public callCaptionFunc = () => {
        this.state.listCallback.logger();
    }


    public render() {
        return (<div>
            <Header person={this.props.person} addVideo={this.addVideo} />
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <ReactPlayer
                            ref={this.setRef}
                            controls={true}
                            url={this.state.playingURL}
                            width="100%"
                            height="400px"
                            playing={true}
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 1 },
                                    preload: true
                                }
                            }
                            }
                        />
                    </div>
                    <div className="col-5">
                        <VideoList play={this.updateURL} mount={this.listMounted} />
                    </div>
                </div>

                <CaptionArea play={this.updateURL} />
            </div>
        </div>)
    }
}
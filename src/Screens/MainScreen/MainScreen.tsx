import * as React from 'react';
import ReactPlayer from 'react-player'
import CaptionArea from 'src/Components/CaptionArea'
import Header from 'src/Components/Header'
interface IProps {
    person: object
}

interface IState {
    player: any,
    playingURL:string
    videoList: object
}

export default class MainScreen extends React.Component<IProps,IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            player: null,
            // got to love pewdiepie
            playingURL:"https://www.youtube.com/watch?v=6NLy743EFIA",
            videoList:{},
        }
        console.log(this.props)
    }

    public setRef = (playerRef:any) => {
        this.setState({
            player: playerRef
        })
    }
    // Never be silly always use arrow functions
    // Object uses hash table under the hood avoid the duplication yo
    public addVideo = (url:string) =>{
        this.state.videoList[url] = true;
        console.log(this.state.videoList)
    }

    // Better than rerendering the player but if its confusing let me know
    public seek = (time:number) =>{
        if(this.state.player !== null){
            this.state.player.seekTo(time,'seconds')
        }else{
            console.log("Error Player is still null")
        }
    }

    public updateURL = (url:string) => {
        this.setState({playingURL:url})
    }

    public render() {
        return (<div>
            <Header person={this.props.person} addVideo={this.addVideo}/>
            <ReactPlayer
                ref = {this.setRef}
                controls = {true}
                url={this.state.playingURL}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                    preload: true
                  }
                }
            }
            />
            <CaptionArea/>
        </div>)
    }
}
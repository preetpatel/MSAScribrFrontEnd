import Close from '@material-ui/icons/Close'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'

interface IState{
    videoList: any
}

interface IProps{
    mount:any
    play:any
}

export default class VideoList extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {
            videoList: []
        }
    }

    public logger = () => {
        console.log("test")
    }

    public deleteVideo = (id:any) => {
        fetch("https://msascribrapi.azurewebsites.net/api/Videos/"+id,{
            method:'DELETE'
        }).then(response => {
            this.updateList()
        })
    }

    public playVideo = (videoUrl:string) => {
        this.props.play(videoUrl)
    }

    public updateList = () => {
        fetch('https://msascribrapi.azurewebsites.net/api/Videos',{
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((result:any) => {
            console.log(result)
            const output:any[] = []
            result.forEach((video:any) => {
                output.push(<tr>
                    <td className="align-middle" onClick={() => this.handleLike(video)}>{video.isFavourite === true?<Star/>:<StarBorder/>}</td>
                    <td className="align-middle" onClick={() => this.playVideo(video.webUrl)}><img src={video.thumbnailUrl} width="100px" alt="Thumbnail"/></td>
                    <td className="align-middle" onClick={() => this.playVideo(video.webUrl)}><b>{video.videoTitle}</b></td>
                    <td className="align-middle video-list-close"><button onClick={() => this.deleteVideo(video.videoId)}><Close/></button></td>
                </tr>)
            });
            this.setState({videoList:output})
        })
    }

    public handleLike = (video:any) => {
        let bool = video.isFavourite
        bool = !bool
        fetch("https://msascribrapi.azurewebsites.net/api/Videos/update/"+video.videoId, {
            body: "[ { \"value\": " + bool + ", \"path\": \"/isFavourite\", \"op\": \"replace\", \"from\": \"\" }]",
            headers: {
              Accept: "text/plain",
              "Content-Type": "application/json-patch+json"
            },
            method: "PATCH"
          }).then(response => {
              return response.json()
          }).then(ret => {
              this.updateList();
          })
    }
    
    public componentDidMount = () => {
        this.props.mount(this)
        this.updateList()
    }



    public render() {
        return (
            <div className="video-list">
                <h1 className="play-heading"><span className="red-heading">play</span>video</h1>
                <table className="table">
                    {this.state.videoList}
                </table>
            </div>
        )
    }
}
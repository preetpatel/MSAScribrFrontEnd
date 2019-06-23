import Close from '@material-ui/icons/Close'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'

interface IState{
    videoList: any
}

interface IProps{
    mount:any
}

export default class VideoList extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {
            videoList: []
        }
    }

    public logger = () => {
        console.log(this.state.videoList)
    }

    public deleteVideo = (video:any) => {
        console.log("deleting this video " + video);
    }

    public playVideo = (videoUrl:string) => {
        console.log("Playing video " + videoUrl);     
    }

    public updateList = () => {
        // Make call to api
        const result = {
            "videos" : [
                {
                    "id" : 1,
                    "title" : "Try not to laugh challenge 😂 - Cognitive Services | Microsoft Azure",
                    "videoURL" : "https://www.youtube.com/watch?v=5OS_J_mfNYI",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/5OS_J_mfNYI/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBeoJP0ynh-CBnGIPx7--OgbUEHCA",
                    "isFavourite" : "true"
                },
                {
                    "id" : 2,
                    "title" : "HOW OLD? - CREATE A WEBSITE...FAST! | Microsoft Azure",
                    "videoURL" : "https://www.youtube.com/watch?v=8tmeZ8oh_pA",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/8tmeZ8oh_pA/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAyCGSFiiq_L8qussLnlTbJTD1TOA",
                    "isFavourite" : "false"
                },
                {
                    "id" : 3,
                    "title" : "ARTIFICIAL INTELLIGENCE and MACHINE LEARNING | Microsoft Azure",
                    "videoURL" : "https://www.youtube.com/watch?v=N7dmGJfHS6M&t=17s",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/N7dmGJfHS6M/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAuzvFhwkJthTyw3ywVsdXNz2GEFw",
                    "isFavourite" : "false"
                },
                {
                    "id" : 4,
                    "title" : "Learn SQL Database and RESTful Web API | Microsoft Azure",
                    "videoURL" : "https://www.youtube.com/watch?v=U6SlmoXWf3o",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/U6SlmoXWf3o/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDNSQHBKYKvK1IoD4COj77sm0Uzfg",
                    "isFavourite" : "false"
                },
                {
                    "id" : 2,
                    "title" : "HOW OLD? - CREATE A WEBSITE...FAST! | Microsoft Azure",
                    "videoURL" : "https://www.youtube.com/watch?v=8tmeZ8oh_pA",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/8tmeZ8oh_pA/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAyCGSFiiq_L8qussLnlTbJTD1TOA",
                    "isFavourite" : "false"
                },
                {
                    "id" : 2,
                    "title" : "HOW OLD? - CREATE A WEBSITE...FAST! | Microsoft Azure",
                    "videoURL" : "https://www.youtube.com/watch?v=8tmeZ8oh_pA",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/8tmeZ8oh_pA/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAyCGSFiiq_L8qussLnlTbJTD1TOA",
                    "isFavourite" : "false"
                }
            ]
        }
        const output:any[] = []
        result.videos.forEach(video => {
            console.log(video)
            output.push(<tr onClick={() => this.playVideo(video.videoURL)}>
                <td className="align-middle">{video.isFavourite === "true"?<Star/>:<StarBorder/>}</td>
                <td className="align-middle"><img src={video.thumbnailURL} width="100px" alt="Thumbnail"/></td>
                <td className="align-middle"><b>{video.title}</b></td>
                <td className="align-middle"><button onClick={() => this.deleteVideo(video)}><Close/></button></td>
            </tr>)
        });
        console.log(output)
        this.setState({videoList:output},() => this.forceUpdate())
    }

    public handleLike = (video:any) => {
        // Make call to api for like
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
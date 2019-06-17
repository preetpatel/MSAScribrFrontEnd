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
                    "title" : "Title of the video",
                    "videoURL" : "https://www.youtube.com/watch?v=CYmTmWlsNhg",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnailURL" : "https://i.ytimg.com/vi/sDjLflpTm4o/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLALkmnewoGKLtGFmHSiDt0bDTLLgw",
                    "isFavourite" : "true"
                },
                {
                    "id" : 2,
                    "title" : "Title of the video",
                    "videoURL" : "https://www.youtube.com/watch?v=CYmTmWlsNhg",
                    // tslint:disable-next-line:object-literal-sort-keys
                    "thumbnail" : "https://i.ytimg.com/vi/sDjLflpTm4o/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLALkmnewoGKLtGFmHSiDt0bDTLLgw",
                    "isFavourite" : "false"
                }
            ]
        }
        const output:any[] = []
        result.videos.forEach(video => {
            console.log(video)
            output.push(<tr onClick={() => this.playVideo(video.videoURL)}>
                <td>{video.isFavourite === "true"?"Is favourite":"Not Favourite"}</td>
                <td><img src={video.thumbnailURL} alt="Thumbnail"/></td>
                <td><b>{video.title}</b></td>
                <td><button onClick={() => this.deleteVideo(video)}>Delete Video</button></td>
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
            <div>
                <table>
                    <tr>
                        <th>Favourite</th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Delete</th>
                    </tr>
                    {this.state.videoList}
                </table>
            </div>
        )
    }
}
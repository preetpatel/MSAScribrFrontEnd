# NZMSA 2019 Phase-2 Frontend - Scribr

Note: This documentation is probably not going to be everything which is covered. All of the code will be properly covered in the in-person workshop, with a link to the recording being available at a later date.

## Contents
1.  [__Before You Start__](#1.-before-you-start)
2. [__Starter Project Overview__](#2.-starter-project-overview)



# 1. Before You Start

Before you start coding away, take a moment to have a look through this section of the repo. You'll notice that there are two folders - 'Starter Project' and 'Completed Project'. If you want to see what the final output will look like or have any issues following this documentation, go ahead and npm install then npm start inside that folder.

In the starter code, the structure, styling and basic functions have all been provided (otherwise this document would be massive!). Since you should all be familiar with React js, we'll be focusing on consuming the API for all of the CRUD (Create, Read, Update, Delete) operations. Specifically, they are:

- CREATE: Uploading a video (POST)
- READ: Retrieving all the videos and captions (GET)
- UPDATE: Liking a video (adding it to your favourites) (PUT)
- DELETE: Deleting a video (DELETE)

We will also be taking a look at some of the slightly more complex features which have been used in this project.

Before you proceed, make sure you download / clone the starter project and `npm install` (this might take some time). We'll be building on this project!

# 2. Starter Project Overview

In the project you'll want to take a look at a few files

- `App.tsx` which provides the structure for the components and handles the rendering of the rest of the components.

- `VideoList.tsx` Provides the side list which contains all the videos that have been transcribed

- `CaptionArea.tsx` Provides the area where we can display all the searched captions

- `Header.tsx` The header component which contains the text input for adding videos

- `index.css` and `App.css ` Contains the styling for components which we will be using

# 3. Video List
## 3.1 Get all the videos
We will need to populate our list of videos with the videos which we have currently got transcribed to do this we need to make a GET request. To do this we need to make a call to the `https://msascribrapi.azurewebsites.net/api/Videos`.

To do so lets add some code to the update list method. But first we need to know what response we will be expecting we can use the inbuilt postman tool at `https://msascribrapi.azurewebsites.net/` to see what the response from the API will look like.

```JSON
[
  {
    "videoId": 32,
    "videoTitle": "Marketing to Doctors: Last Week Tonight with John Oliver (HBO)",
    "videoLength": 1033,
    "webUrl": "https://www.youtube.com/watch?v=YQZ2UeOTO3I",
    "thumbnailUrl": "https://i.ytimg.com/vi/YQZ2UeOTO3I/mqdefault.jpg",
    "isFavourite": true,
    "transcription": []
  },
  {
    "videoId": 34,
    "videoTitle": "CS50 2018 - Lecture 0 - Computational Thinking, Scratch",
    "videoLength": 4235,
    "webUrl": "https://www.youtube.com/watch?v=5azaK2cBKGw",
    "thumbnailUrl": "https://i.ytimg.com/vi/5azaK2cBKGw/mqdefault.jpg",
    "isFavourite": true,
    "transcription": []
  }
]
```

We now know that we need to loop over the array that is provided and each object within this represents a different video. We should therefore be rendering a different table item for every object. So we can go ahead and start coding the function `updateList()` in `VideoList.tsx`

```javascript
        fetch('https://msascribrapi.azurewebsites.net/api/Videos',{
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((result:any) => {
            const output:any[] = []
            result.forEach((video:any) => {
                const row = (<tr>
                    <td className="align-middle" onClick={() => this.handleLike(video)}>{video.isFavourite === true?<Star/>:<StarBorder/>}</td>
                    <td className="align-middle" onClick={() => this.playVideo(video.webUrl)}><img src={video.thumbnailUrl} width="100px" alt="Thumbnail"/></td>
                    <td className="align-middle" onClick={() => this.playVideo(video.webUrl)}><b>{video.videoTitle}</b></td>
                    <td className="align-middle video-list-close"><button onClick={() => this.deleteVideo(video.videoId)}><Close/></button></td>
                </tr>)
                if(video.isFavourite){
                    output.unshift(row);
                }else{
                    output.push(row);
                }
            });
            this.setState({videoList:output})
        })
```

In this code we first perform a GET requeest via the fetch api. Then we convert the response into a json object. Then for every video in the object we map this to a Row in our Video List. After we make our table row we need to add it to our output array. However it looks better if we have the videos that are favourited appearing at the start of the video list. To do this we can use the inbuilt array methods of unshift and push. Push will append the item to the end of the array however the unshift method puts the item at the beginning of the array. So if the video is favourited we want to put it at the start so we use unshift.

## 3.2 Handling Liking of Videos

To handle the liking of videos we need to make an update to the video. Looking at our API at `https://msascribrapi.azurewebsites.net/` we will need to use the Patch Request for videos. This is under `https://msascribrapi.azurewebsites.net/api/Videos/Update/{id}` for this request we need to replace {id} with the id of the video that we are looking to update. This api call requires an array to be passed in which contains an object. It requires a few key value pairs which will 

```javascript
    public handleLike = (video:any) => {
        const toSend = [{
            "from":"",
            "op":"replace",
            "path":"/isFavourite",
            "value":!video.isFavourite,
        }]
        fetch("https://msascribrapi.azurewebsites.net/api/Videos/update/"+video.videoId, {
            body:JSON.stringify(toSend),
            headers: {
              Accept: "text/plain",
              "Content-Type": "application/json-patch+json"
            },
            method: "PATCH"
          }).then(response => {
              return response.json()
          }).then(() => {
              this.updateList();
          })
    }
```

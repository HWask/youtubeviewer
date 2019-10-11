# youtubeviewer


Youtubeviewer lets you explore your oversized playlists on youtube. It is written using the React framework and is meant to be run in a webbrowser. The json files need to have the following format:

[
  {
    title:"Im a video",
    description:"this video is about...",
    img:"https://imageforthevideo.jpg",
    link:"https://linktothevideo"
  },
  ...
]

Generally speaking this is intended to let you explore your oversized playlists on youtube but can also work with any other json data that respects the mentioned data format. You can search for specific videos by title. Regular Expressions are supported aswell. By clicking on an image the video is marked for export. By clicking on export you get a list of youtube links to the videos you marked earlier. In order to get a valid json file you can use my youtubescraper https://github.com/HWask/youtubescraper/ python script. It uses the youtube API to retrieve the video data saved in a playlist, but also supports other features.


![Screenshot](https://i.imgur.com/0wqRNKX.png)
![Screenshot](https://i.imgur.com/txqmDlA.png)

Dependencies: jquery

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'


class Video extends Component {
    render () {
        return (
        <div>
            <ReactPlayer
            className='react-player fixed-bottom'
            url= 'videos/demo_video.MP4'
            width='100%'
            height='100%'
            controls = {true}

            />
            {/* <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}></div> */}
        </div>
        )
    }
}

ReactDOM.render(
    <Video />,
    document.getElementById('root')
  );
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'


class Video extends Component {
    state = {
        url: 'videos/1.MP4',
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
      }
    load = url => {
        console.log(url)
        this.setState({
            url
            //played: 0,
            //loaded: 0,
            //pip: false
        })
    }
    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }
    handleSeekMouseDown = e => {
        console.log('down')
        this.setState({ seeking: true })
    }
    handleSeekChange = e => {
        console.log('change')
        this.setState({ played: parseFloat(e.target.value) })
    }
    handleSeekMouseUp = e => {
        console.log('up')
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }
    ref = player => {
        this.player = player
    }
    
    render () {
        const {url, played} = this.state
        return (
        
        <div>
            <ReactPlayer
            ref={this.ref}
            className='react-player fixed-bottom'
            url= {url}
            played = {played}
            width='100%'
            height='100%'
            controls = {true}
            onProgress={this.handleProgress}
            />
            <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
            <button onClick={() => this.load('videos/1.MP4', played)}>
                camera1
            </button>
            <button onClick={() => this.load('videos/2.MP4', played)}>
                camera2
            </button>
            <button onClick={() =>this.player.seekTo(12)}>
                highlight1 : 12s
            </button>
            <button onClick={() => this.player.seekTo(37)}>
                highlight2 : 37s
            </button>
        </div>
        )
    }
}

ReactDOM.render(
    <Video />,
    document.getElementById('root')
  );
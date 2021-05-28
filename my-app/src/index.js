import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { getHighlightTimeStamp } from "./210522_highlights";
class Video extends Component {
  state = {
    //url: "videos/210523_main.MP4",
    playing: false,
    controls: true,
    volume: 0.8,
  };

  load = (url) => {
    console.log(url);
    this.setState({
      url: url,
      // lastTime: played,
      //loaded: 0,
      //pip: false
    });
  };

  ref = (player) => {
    this.player = player
  };

  handleKeyPress = (event) => {
    console.log(event);
    if (event.which === 39) {
      event.preventDefault();
      this.player.seekTo(this.player.getCurrentTime() - this.player.getDuration() * 0.01 + 3);
    } else if (event.which === 37) {
      event.preventDefault();
      this.player.seekTo(this.player.getCurrentTime() + this.player.getDuration() * 0.01 - 3);
    }
  };

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  render() {
    const { url, played } = this.state;
    const hl = getHighlightTimeStamp();
    const inner = this.getWindowDimensions();
    const cameraStyle = {
      display: "flex",
      fontSize: 16,
      alignText: "left",
      marginTop: 8,
      backgroundColor: "white",
      borderStyle: "solid",
      borderColor: "gray",
      borderWidth: 2,
      borderRadius: 16,
      padding: 16,
    };

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <div style={{marginBottom: "700px"}}>
          <ReactPlayer
            ref={this.ref}
            className="react-player fixed-bottom"
            url="videos/210523_left.MP4"
            width="100%"
            height="100%"
            controls={true}
            onKeyDown={this.handleKeyPress}
          />
          </div>
          <div style={{marginBottom: "700px"}}>
          <ReactPlayer
            ref={this.ref}
            className="react-player fixed-bottom"
            url="videos/210523_main.MP4"
            width="100%"
            height="100%"
            controls={true}
            onKeyDown={this.handleKeyPress}
          />
          </div>
          <div style={{marginBottom: "700px"}}>
          <ReactPlayer
            ref={this.ref}
            className="react-player fixed-bottom"
            url="videos/210523_right.MP4"
            width="100%"
            height="100%"
            controls={true}
            onKeyDown={this.handleKeyPress}
          />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
            <button
              class="button"
              style={cameraStyle}
              onClick={() => window.scrollTo(0, 0)}
            >
              left
            </button>
            <button
              class="button"
              style={cameraStyle}
              onClick={() => window.scrollTo(0, 1250)}
            >
              main
            </button>
            <button
                class="button"
                style={cameraStyle}
                onClick={() => window.scrollTo(0, 2500)}
              >
                right
              </button>
          </div>
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            maxHeight: 240,
            overflow: "scroll",
            margin: 16,
            width: Math.min(720, inner.Width - 32),
            marginTop: 16,
            
          }}
        >
          
          {hl.map((val) => {
            console.log(val);
            return (
              <button
                class="button"
                onClick={() => this.player.seekTo(val.min * 60 + val.sec)}
                style={{
                  display: "flex",
                  fontSize: 16,
                  alignText: "left",
                  marginTop: 8,
                  backgroundColor: "white",
                  borderStyle: "solid",
                  borderColor: "gray",
                  borderWidth: 2,
                  borderRadius: 16,
                  padding: 12,
                }}
              >
                {val.min} 분 {val.sec} 초: {"\r" + val.tag}
              </button>
            );
          })}
        </div>
          </div>
        </div>
    );
  }
}

ReactDOM.render(<Video />, document.getElementById("root"));

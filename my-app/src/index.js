import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { getHighlightTimeStamp } from "./210522_highlights";
import "./index.css";
class Video extends Component {
  state = {
    url: "videos/210523_main.MP4",
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
    this.player = player;
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
    const cameraStyle = {};

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <ReactPlayer
          ref={this.ref}
          className="react-player fixed-bottom"
          url={url}
          width="100%"
          height="100%"
          controls={true}
          onKeyDown={this.handleKeyPress}
          // config={{
          //   file: {
          //     // attributes : { controlslist : "noremoteplayback"}
          //   }
          // }}
          //onProgress={this.handleProgress}
        />
        <div class="sideBar">
          <div class="sideBarTitle">
            <text style={{ fontSize: "32px" }}>camera</text>
          </div>
          <div class="selectButtons">
            <button class="button" style={cameraStyle} onClick={() => this.load("videos/210523_left.MP4", played)}>
              left
            </button>
            <button class="button" style={cameraStyle} onClick={() => this.load("videos/210523_main.MP4", played)}>
              main
            </button>
            <button class="button" style={cameraStyle} onClick={() => this.load("videos/210523_right.MP4", played)}>
              right
            </button>
          </div>
          <div
            class="tags"
            style={{
              width: Math.min(720, inner.Width - 32),
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

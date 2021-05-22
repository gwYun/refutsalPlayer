import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { getHighlightTimeStamp } from "./210522_highlights";

class Video extends Component {
  state = {
    url: "videos/1.MP4",
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
    loop: false,
  };
  load = (url, played) => {
    console.log(url);
    this.setState({
      url: url,
      // lastTime: played,
      played: played,
      //loaded: 0,
      //pip: false
    });
  };
  handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  handleSeekMouseDown = (e) => {
    console.log("down");
    this.setState({ seeking: true });
  };
  handleSeekChange = (e) => {
    console.log("change");
    this.setState({ played: parseFloat(e.target.value) });
  };
  handleSeekMouseUp = (e) => {
    console.log("up");
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };
  ref = (player) => {
    this.player = player;
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

    return (
      <div style={{ display: "flex", flexDirection: inner.width > 720 ? "row" : "column", maxHeight: 720 }}>
        <div style={{ display: "felx", justifyContent: "flex-start" }}>
          <ReactPlayer
            ref={this.ref}
            className="react-player fixed-bottom"
            url={url}
            played={played}
            width="100%"
            height="100%"
            controls={true}
            onProgress={this.handleProgress}
          />
          <div style={{ display: "flex", felxDirection: "row" }}>
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={this.handleSeekMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            />
            <button
              class="button"
              style={{
                display: "flex",
                fontSize: 16,
                alignText: "left",
                marginTop: 8,
                marginLeft: 16,
                backgroundColor: "white",
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 2,
                borderRadius: 16,
                padding: 16,
              }}
              onClick={() => this.load("videos/1.MP4", played)}
            >
              camera1
            </button>
            <button
              class="button"
              style={{
                display: "flex",
                fontSize: 16,
                alignText: "left",
                marginTop: 8,
                marginLeft: 16,
                backgroundColor: "white",
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 2,
                borderRadius: 16,
                padding: 16,
              }}
              onClick={() => this.load("videos/2.MP4", played)}
            >
              camera2
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            maxHeight: 720,
            overflow: "scroll",
            margin: 16,
            width: Math.min(720, inner.Width - 32),
            marginTop: 24,
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
                  padding: 16,
                }}
              >
                {val.min} 분 {val.sec} 초: {"\r" + val.tag}
              </button>
            );
          })}
        </div>
        {/* <button onClick={() => this.player.seekTo(12)}>highlight1 : 12s</button>
        <button onClick={() => this.player.seekTo(37)}>highlight2 : 37s</button> */}
      </div>
    );
  }
}

ReactDOM.render(<Video />, document.getElementById("root"));

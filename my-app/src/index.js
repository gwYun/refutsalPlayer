import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { Scrollbars } from "react-custom-scrollbars-2";

import { getHighlightTimeStamp } from "./210522_highlights";
import "./index.css";
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

    return (
      <Scrollbars style={{ width: "97vw", height: "97vh", marginBottom: "3vh" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div class="playerContainer">
              <ReactPlayer
                ref={this.ref}
                className="react-player fixed-bottom"
                url={this.props.url}
                width="100%"
                height="100%"
                controls={true}
                onKeyDown={this.handleKeyPress}
              />
            </div>
          </div>

          <div class="sideBar">
            <div class="sideBarTop">
              <div class="sideBarTitle">
                <text style={{ fontSize: "32px" }}>camera</text>
              </div>
              <div class="selectButtons">
                <button class="cameraButton" onClick={() => window.scrollTo(0, 0)}>
                  left
                </button>
                <button class="cameraButton" onClick={() => window.scrollTo(0, inner.height)}>
                  main
                </button>
                <button class="cameraButton" onClick={() => window.scrollTo(0, inner.height * 2)}>
                  right
                </button>
              </div>
            </div>
            <Scrollbars class="tags">
              {hl.map((val) => {
                console.log(val);
                return (
                  <button
                    class="oneTag"
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
            </Scrollbars>
          </div>
        </div>
      </Scrollbars>
    );
  }
}

ReactDOM.render(
  <>
    <Video url="videos/210523_left.MP4" />
    <Video url="videos/210523_left.MP4" />
    <Video url="videos/210523_left.MP4" />
  </>,
  document.getElementById("root")
);

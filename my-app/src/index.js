import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";

import { getHighlightTimeStamp } from "./210530_highlights";
import "./index.css";

window.addEventListener("scroll", function () {
  console.log(window.pageYOffset + "px");
  //console.log(window.innerHeight  + 'px')
  if (window.pageYOffset < window.innerHeight * 0.7) window.scrollTo(0, 0);
  else if (window.pageYOffset < window.innerHeight * 1.4) window.scrollTo(0, window.innerHeight);
  else window.scrollTo(0, window.innerHeight * 2);
});

class Video extends Component {
  state = {
    //url: "videos/210523_main.MP4",
    playing: true,
    state: false,
    controls: false,
    volume: 0.8,
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

  handleLeftButtonPress = (camera) => {
    window.scrollTo(0, 0);
    this.setState({ playing: false });
    if (camera === "leftCamera") {
      console.log("LEFT");
    } else if (camera === "mainCamera") {
      console.log("MAIN");
    } else if (camera === "rightCamera") {
      console.log("RIGHT");
    }
  };
  handleMainButtonPress = (camera) => {
    window.scrollTo(0, this.getWindowDimensions().height);
    this.setState({ playing: false });
    if (camera === "leftCamera") {
      console.log("LEFT");
    } else if (camera === "mainCamera") {
      console.log("MAIN");
    } else if (camera === "rightCamera") {
      console.log("RIGHT");
    }
  };
  handleRightButtonPress = (camera) => {
    window.scrollTo(0, this.getWindowDimensions().height * 2);
    this.setState({ playing: false });
    if (camera === "leftCamera") {
      console.log("LEFT");
    } else if (camera === "mainCamera") {
      console.log("MAIN");
    } else if (camera === "rightCamera") {
      console.log("RIGHT");
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
    const { playing } = this.state;
    const hl = getHighlightTimeStamp();
    const inner = this.getWindowDimensions();

    const getTitleAlign = (title) => {
      let alignment;
      console.log(title[0]);
      if (title[0] === "흰") alignment = "flex-start";
      else if (title[0] === "조") alignment = "flex-end";
      else alignment = "center";
      return alignment;
    };

    return (
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", height: "100vh", width: "100vw" }}
        class="body"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "97vh",
            marginBottom: "3vh",
          }}
        >
          <div class="playerContainer">
            <ReactPlayer
              ref={this.ref}
              className="react-player fixed-bottom"
              url={this.props.url}
              width="100%"
              height="100%"
              controls={true}
              playing={playing}
              onKeyDown={this.handleKeyPress}
            />
          </div>
        </div>
        <div class="sideBar">
          <div class="sideBarTop">
            <button class="sideBarTitle">camera</button>
            <div class="cameraButtons">
              <button class="cameraButton" onClick={() => this.handleLeftButtonPress(this.props.playerName)}>
                left
              </button>
              <div style={{ backgroundColor: "white", height: 24, width: 2 }} />
              <button class="cameraButton" onClick={() => this.handleMainButtonPress(this.props.playerName)}>
                main
              </button>
              {/* <button class="cameraButton" onClick={() => this.handleRightButtonPress(this.props.playerName)}>
              right
            </button> */}
            </div>
          </div>
          <div class="tags">
            {hl.map((val, index) => {
              //console.log(val);
              return (
                <button
                  class="oneTag"
                  style={{ backgroundColor: index % 2 === 0 ? "white" : "#eee" }}
                  onClick={() => this.player.seekTo(val.min * 60 + val.sec)}
                >
                  <div
                    class="tagTitle"
                    style={{
                      justifyContent: getTitleAlign(val.tag),
                    }}
                  >
                    <div>{"\r" + val.tag}</div>
                  </div>
                  <div class="tagTime">
                    {val.min} : {val.sec < 10 ? "0" + val.sec : val.sec}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div
    style={{
      overflow: "hidden",
    }}
  >
    <Video url="videos/210530_left.MP4" playerName="leftCamera" />
    <Video url="videos/210530_main.MP4" playerName="mainCamera" />
    {/* <Video url="videos/210523_right.MP4" playerName="rightCamera" /> */}
  </div>,
  document.getElementById("root")
);

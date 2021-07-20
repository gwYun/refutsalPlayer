import React, { Component } from "react";
import ReactPlayer from "react-player";
import { getHighlightTimeStamp } from "../highlights/210713_highlights";
// import getHighlights from "./getHighlights";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../index.css";
export default class Video extends Component {
  state = {
    urlWithTime: `http://143.248.109.113:3000${this.props.url}`,
    url: this.props.url,
    videoUrl: this.props.videoUrl,
    playing: true,
    state: false,
    controls: false,
    volume: 0.8,
    played: 0,
    duration: 0,
    // hl: getHighlights(this.props.date, this.props.team),
  };

  load = (videoUrl) => {
    this.setState({
      videoUrl: videoUrl,
      played: this.state.played,
      // loaded: 0,
      pip: false,
    });
  };

  ref = (player) => {
    this.player = player;
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
    console.log(this.state.played);
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    this.setState({
      urlWithTime: `http://143.248.109.113:3000/${this.props.date}_${this.props.team}_${
        this.props.camera
      }_${this.player.getCurrentTime()}`,
    });
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
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

  handleLeftButtonPress = () => {
    console.log(this.state.played);
    let newUrl = `videos/${this.props.date}_${this.props.team}_left.MP4#t=${this.player.getCurrentTime()}`;
    console.log(newUrl);
    this.load(newUrl);
  };

  handleMainButtonPress = () => {
    console.log(this.state.played);
    let newUrl = `videos/${this.props.date}_${this.props.team}_main.MP4#t=${this.player.getCurrentTime()}`;
    console.log(newUrl);
    this.load(newUrl);
  };

  handleRightButtonPress = () => {
    console.log(this.state.played);
    let newUrl = `videos/${this.props.date}_${this.props.team}_right.MP4#t=${this.player.getCurrentTime()}`;
    console.log(newUrl);
    this.load(newUrl);
  };

  handleShareButtonPress = (text, result) => {
    alert("주소가 복사되었습니다!");
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  render() {
    const { urlWithTime, playing, played, duration } = this.state;
    const hl = getHighlightTimeStamp();

    // console.log(hl);

    const getTitleAlign = (title) => {
      let alignment;
      // console.log(title[0]);
      if (title[0] === "조") alignment = "flex-start";
      else if (title[0] === "일") alignment = "flex-end";
      else alignment = "center";
      return alignment;
    };

    return (
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", height: "98vh", width: "100vw" }}
        class="body"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "97vh",
            // marginBottom: "3vh",
          }}
        >
          <div class="playerContainer">
            <ReactPlayer
              ref={this.ref}
              className="react-player fixed-bottom"
              url={this.state.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={playing}
              played={played}
              onKeyDown={this.handleKeyPress}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>
        </div>
        <div class="sideBar">
          <div class="sideBarTop">
            <button class="sideBarTitle">Re:futsal TV</button>
            <div class="cameraButtons">
              <CopyToClipboard
                text={urlWithTime}
                onCopy={(text, result, alert) => this.handleShareButtonPress(text, result, alert)}
              >
                <button class="cameraButton">현재 시점 공유</button>
              </CopyToClipboard>
            </div>
            <div class="cameraButtons">
              <button class="cameraButton" onClick={() => this.handleLeftButtonPress()}>
                left
              </button>
              {/* <div style={{ backgroundColor: "white", height: "5vh", width: "0.2vw" }} /> */}
              {/* <button class="cameraButton" onClick={() => this.handleMainButtonPress()}>
                main
              </button> */}

              {/* <div style={{ backgroundColor: "white", height: 24, width: 2 }} /> */}
              <button class="cameraButton" onClick={() => this.handleRightButtonPress()}>
                right
              </button>
            </div>
          </div>
          <div class="tags">
            {hl.map((val, index) => {
              //console.log(val);
              return (
                <button
                  class="oneTag"
                  style={{ backgroundColor: index % 2 === 0 ? "white" : "#eee" }}
                  onClick={() => this.player.seekTo(val.min * 60 + val.sec - 5)}
                >
                  <div
                    class="tagTitle"
                    style={{
                      justifyContent: getTitleAlign(val.tag),
                    }}
                  >
                    <div style={{ maxWidth: "15vw" }}>{"\r" + val.tag}</div>
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

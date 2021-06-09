import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { getHighlightTimeStamp } from "./210606_highlights";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
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
    url: this.props.url,
    playing: true,
    state: false,
    controls: false,
    volume: 0.8,
    played: 0,
    duration: 0,
  };

  load = (url) => {
    this.setState({
      url,
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

  handleLeftButtonPress = (camera) => {
    console.log(this.state.played);
    window.scrollTo(0, 0);
    let newUrl = "videos/210530_left.MP4#t=" + this.player.getCurrentTime();
    console.log(newUrl);
    this.load(newUrl);
  };

  handleMainButtonPress = (camera) => {
    console.log(this.state.played);
    let newUrl = "videos/210530_main.MP4#t=" + this.player.getCurrentTime();
    console.log(newUrl);
    this.load(newUrl);
  };

  handleRightButtonPress = (camera) => {
    console.log(this.state.played);
    let newUrl = "videos/210530_right.MP4#t=" + this.player.getCurrentTime();
    console.log(newUrl);
    this.load(newUrl);
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  render() {
    const { playing, played, duration } = this.state;
    const hl = getHighlightTimeStamp();
    const inner = this.getWindowDimensions();

    const getTitleAlign = (title) => {
      let alignment;
      // console.log(title[0]);
      if (title[0] === "일") alignment = "flex-start";
      else if (title[0] === "조") alignment = "flex-end";
      else alignment = "center";
      return alignment;
    };

    const ReactPlayerUrl = () => {
      let { timeStamp } = useParams();
      console.log(timeStamp);
      const newUrl = this.state.url + "#t=" + timeStamp;
      console.log(newUrl);
      this.setState({ url: newUrl, played: timeStamp });
      return (
        <ReactPlayer
          ref={this.ref}
          className="react-player fixed-bottom"
          url={newUrl}
          width="100%"
          height="100%"
          controls={true}
          playing={playing}
          played={played}
          onKeyDown={this.handleKeyPress}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
        />
      );
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
            <Router>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/t/3">time</Link>
                </li>
                <li>
                  <Link to="/users">users</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/home">
                  <ReactPlayer
                    ref={this.ref}
                    className="react-player fixed-bottom"
                    url={this.state.url}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={playing}
                    played={played}
                    onKeyDown={this.handleKeyPress}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                  />
                </Route>
                {/* <Route path="/t/:timeStamp" children={<ReactPlayerUrl />} /> */}
                {/* <ReactPlayer
                  ref={this.ref}
                  className="react-player fixed-bottom"
                  url={this.state.url + "#t=32"}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={playing}
                  played={played}
                  onKeyDown={this.handleKeyPress}
                  onProgress={this.handleProgress}
                  onDuration={this.handleDuration}
                /> */}
                {/* </Route> */}
                {/* <Route
                path="/t/:timeStamp"
                render={({ match }) => <ReactPlayerUrl timeStamp={match.params.timeStamp} />}
              /> */}
                {/* <Route path="/users">
                  <div>something</div>
                </Route> */}
              </Switch>
            </Router>
          </div>
        </div>
        <div class="sideBar">
          <div class="sideBarTop">
            <button class="sideBarTitle">camera</button>
            <div class="cameraButtons">
              <button class="cameraButton" onClick={() => this.handleLeftButtonPress(this.props.playerName)}>
                left
              </button>
              {/* <div style={{ backgroundColor: "white", height: "5vh", width: "0.2vw" }} /> */}
              <button class="cameraButton" onClick={() => this.handleMainButtonPress(this.props.playerName)}>
                main
              </button>
              {/* <div style={{ backgroundColor: "white", height: 24, width: 2 }} />
              <button class="cameraButton" onClick={() => this.handleRightButtonPress(this.props.playerName)}>
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
                  onClick={() => this.player.seekTo(val.min * 60 + val.sec - 5)}
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
  <div style={{ overflow: "hidden" }}>
    <Video url="videos/210530_left.MP4" playerName="leftCamera" isWIP={false} />
  </div>,
  document.getElementById("root")
);

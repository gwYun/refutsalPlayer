import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import "./index.css";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Video from "./components/player";

ReactDOM.render(
  <div style={{ overflow: "hidden" }}>
    <Router>
      <Switch>
        <Route path="/:fileInfo">
          <VideoRouter />
        </Route>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);

function VideoRouter() {
  let { url } = useRouteMatch();
  let name = url.split("/")[1];
  let [date, team, camera, time] = name.split("_");

  console.log(url, date, team, camera, time);

  let videoUrl = `videos/${date}_${team}_${camera}.MP4#t=${time}`;
  // let videoUrlWithoutTime = `${date}_${team}_${camera}`;

  return (
    <Video
      url={url}
      date={date}
      team={team}
      camera={camera}
      time={time}
      videoUrl={videoUrl}
      name={name}
      isWIP={false}
    />
  );
}

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
  let date = name.split("_")[0];
  let team = name.split("_")[1];
  let camera = name.split("_")[2];
  let time = name.split("_")[3];

  console.log(url, date, team, camera, time);
  let videoUrl = `videos/${date}_${team}_${camera}.MP4#t=${time}`;

  return <Video url={videoUrl} name={name} isWIP={false} />;
}

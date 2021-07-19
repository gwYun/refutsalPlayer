import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import "./index.css";
import Video from "./components/player";
import Home from "./components/home";
import NotFound from "./components/notFound";

const fileInfo = [{ routePath: "/210713_YJ", name: "210704" }];

function ReactPlayerUrl(props) {
  let { timeStamp } = useParams();
  console.log(timeStamp);
  const newUrl = props.url + "#t=" + timeStamp;
  console.log(newUrl);
  return <Video url={newUrl} name={props.name} isWIP={false} />;
}

ReactDOM.render(
  <div style={{ overflow: "hidden" }}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {fileInfo.map((info, index) => {
          const url = "videos/" + info.name + "_right.MP4";
          return <Route path={info.routePath} children={<Video url={url} name={info.name} isWIP={false} />} />;
        })}
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import "./index.css";
import Video from "./player";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// window.addEventListener("scroll", function () {
//   console.log(window.pageYOffset + "px");
//   //console.log(window.innerHeight  + 'px')
//   if (window.pageYOffset < window.innerHeight * 0.7) window.scrollTo(0, 0);
//   else if (window.pageYOffset < window.innerHeight * 1.4) window.scrollTo(0, window.innerHeight);
//   else window.scrollTo(0, window.innerHeight * 2);
// });

function ReactPlayerUrl() {
  let { timeStamp } = useParams();
  console.log(timeStamp);
  const newUrl = "videos/210716_left.MP4#t=" + timeStamp;
  console.log(newUrl);
  return <Video url={newUrl} isWIP={false} />;
}

ReactDOM.render(
  <div style={{ overflow: "hidden" }}>
    <Router>
      <Switch>
        <Route path="/210704_BohyukTeam">
          <Video url="videos/210704_left.MP4" isWIP={false} />
        </Route>
        <Route path="/:timeStamp" children={<ReactPlayerUrl />} />
        {/* <Route path="/users">
          <div>something</div>
        </Route> */}
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);

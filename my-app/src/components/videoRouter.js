import React from "react";
import { BrowserRouter as Router, Route, Switch, useParams, useRouteMatch, Redirect } from "react-router-dom";
import Video from "./player";
import NotFound from "./notFound";

function VideoRouter() {
  let { url } = useRouteMatch();
  const name = url.split("/")[1];

  console.log(url);

  return (
    <Router>
      <Switch>
        {/* <Route exact path={match.path} children={<Video url={url} name={name} isWIP={isWIP} />}></Router>; */}
        <Route path={`${url}/:timeStamp`}>
          {/* <ReactPlayerUrl url={url} /> */}
          <Video url={url} name={name} isWIP={false} />
        </Route>
        <Route path={`${url}/`}>
          <Video url={`videos/${name}_right.MP4`} name={name} isWIP={false} />
          {/* children={<Video url={url} name={name} isWIP={isWIP} />} /> */}
          {/* <Redirect to={`${url}/0`} /> */}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function ReactPlayerUrl({ url }) {
  let { timeStamp } = useParams();
  console.log(timeStamp);
  const newUrl = `videos${url}_right.MP4"`;
  console.log(newUrl);
  const name = url.split("/")[1];
  console.log("name:", name);
  return <Video url={newUrl} name={name} isWIP={false} />;
}

export default VideoRouter;

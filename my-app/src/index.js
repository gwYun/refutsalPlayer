import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Video from "./player";

window.addEventListener("scroll", function () {
  console.log(window.pageYOffset + "px");
  //console.log(window.innerHeight  + 'px')
  if (window.pageYOffset < window.innerHeight * 0.7) window.scrollTo(0, 0);
  else if (window.pageYOffset < window.innerHeight * 1.4) window.scrollTo(0, window.innerHeight);
  else window.scrollTo(0, window.innerHeight * 2);
});

ReactDOM.render(
  <div style={{ overflow: "hidden" }}>
    <Video url="videos/210530_left.MP4" playerName="leftCamera" isWIP={false} />
  </div>,
  document.getElementById("root")
);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
  function handleClick() {
    // do something meaningful, Promises, if/else, whatever, and then
    window.location.assign("https://tricky-naranja-b92.notion.site/re-futsal-a1edabb69c924dffb73b63c3101b9c3d");
  }

  return (
    <div>
      <h1>찾는 페이지가 없습니다.</h1>
      <Link onClick={handleClick}>
        {">>>>"} 서비스 안내 페이지로 이동하기 {"<<<<"}
      </Link>
    </div>
  );
}

export default NotFound;

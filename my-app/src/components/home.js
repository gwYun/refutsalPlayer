import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.location.href = "https://tricky-naranja-b92.notion.site/re-futsal-a1edabb69c924dffb73b63c3101b9c3d";
  }, []);

  return (
    <div>
      <h1>서비스 신청 페이지로 이동합니다.</h1>
    </div>
  );
}

export default Home;

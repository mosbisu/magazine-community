import React from "react";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";

const Notification = () => {
  let noti = [
    { userName: "aaaaa", postID: "post1", imageUrl: "" },
    { userName: "aaaaa", postID: "post2", imageUrl: "" },
    { userName: "aaaaa", postID: "post3", imageUrl: "" },
    { userName: "aaaaa", postID: "post4", imageUrl: "" },
    { userName: "aaaaa", postID: "post5", imageUrl: "" },
    { userName: "aaaaa", postID: "post6", imageUrl: "" },
  ];
  return (
    <React.Fragment>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n) => {
          return <Card key={n.postID} {...n} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;

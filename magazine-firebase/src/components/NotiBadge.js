import React, { useState, useEffect } from "react";
// import { Badge } from "@material-ui/core";
// import NotificationIcon from "@material-ui/icons/Notifications";
import { useSelector } from "react-redux";

const NotiBadge = ({ _onClick }) => {
  return (
    <React.Fragment>
      {/* <Badge
        overlap="rectangular"
        color="secondary"
        variant="dot"
        invisible={isRead}
        onClick={notiCheck}
      >
        <NotificationIcon />
      </Badge> */}
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;

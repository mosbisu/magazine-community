import React from "react";
import { Grid, Image, Text } from "../elements";

const PostLayout = ({ layout, preview, content, _ref }) => {
  if (layout === 1) {
    return (
      <React.Fragment>
        <Grid>
          <Text margin="8px" size="16px">
            {content}
          </Text>
          <Image
            shape="rectangle"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
            ref={_ref}
          />
        </Grid>
      </React.Fragment>
    );
  }

  if (layout === 2) {
    return (
      <React.Fragment>
        <Grid>
          <Grid isFlex>
            <Image
              shape="rectangle"
              divide
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
            <Grid width="50%">
              <Text margin="8px" size="16px">
                {content}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  if (layout === 3) {
    return (
      <React.Fragment>
        <Grid>
          <Grid isFlex>
            <Grid width="50%" center>
              <Text margin="8px" size="16px">
                {content}
              </Text>
            </Grid>
            <Image
              shape="rectangle"
              divide
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return null;
};

export default PostLayout;

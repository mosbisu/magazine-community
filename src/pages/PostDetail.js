import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { firestore } from "../shared/firebase";

const PostDetail = () => {
  const { id } = useParams();

  const userInfo = useSelector((state) => state.user.user);
  const postList = useSelector((store) => store.post.list);
  const postData = postList.find((p) => p.id === id);

  const [post, setPost] = useState(postData ? postData : null);

  useEffect(() => {
    if (post) {
      return;
    }

    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        console.log(doc.data());

        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user") !== -1) {
              return {
                ...acc,
                userInfo: { ...acc.userInfo, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, userInfo: {} }
        );

        setPost(post);
      });
  }, [id, post]);

  return (
    <React.Fragment>
      {post && <Post {...post} isMe={post.userInfo.userID === userInfo.uid} />}
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;

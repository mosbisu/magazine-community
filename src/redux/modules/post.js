import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import instance from "../../services/axios";

// action types
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const POST_LIKE = "POST_LIKE";

// action creators
const setPost = createAction(SET_POST, (postList) => ({
  postList,
}));

const addPost = createAction(ADD_POST, (post) => ({ post }));

const editPost = createAction(EDIT_POST, (postNo, post) => ({ postNo, post }));

const deletePost = createAction(DELETE_POST, (postNo) => ({ postNo }));

const postLike = createAction(POST_LIKE, (post, postNo) => ({ post, postNo }));

const initialState = {
  list: [],
};

// middleware
const getPostDB = () => {
  return function (dispatch, getState) {
    instance
      .get("/api/posts")
      .then(function (response) {
        console.log(response);
        dispatch(setPost(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const getOnePostDB = (postNo, post) => {
  return function (dispatch, getState) {
    instance
      .get(`/api/posts/${postNo}`)
      .then(function (response) {
        console.log(response);
        dispatch(setPost([post]));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const addPostDB = (post, navigate) => {
  console.log(post);
  return function (dispatch, getState) {
    instance
      .post("/api/posts", post)
      .then(function (response) {
        console.log(response);
        dispatch(addPost(post));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
};

const editPostDB = (postNo, post, navigate) => {
  return function (dispatch, getState) {
    instance
      .put(`api/posts/${postNo}`, post)
      .then(function (response) {
        console.log(response);
        dispatch(editPost(postNo, post));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const deletePostDB = (postNo, navigate) => {
  return function (dispatch, getState) {
    instance
      .delete(`api/posts/${postNo}`)
      .then(function (response) {
        console.log(response);
        dispatch(deletePost(postNo));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const postLikeDB = (postNo, i, username) => {
  return function (dispatch, getState) {
    instance
      .get(`/api/posts/${postNo}/like/${username}`)
      .then(function (response) {
        console.log(response);
        const _post = getState().post.list;
        const _idx = getState().post.list.findIndex((p) => p.postNo == postNo);
        if (i === 1) {
          const post = {
            ..._post[_idx],
            likes: _post[_idx].likes + parseInt(i),
          };
          dispatch(postLike(post, postNo));
        } else {
          const post = {
            ..._post[_idx],
            likes: _post[_idx].likes + parseInt(i),
          };

          dispatch(postLike(post, postNo));
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
};

// reducer immer

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.postNo === action.payload.postNo
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (p) => p.postNo !== action.payload.postNo
        );
      }),

    [POST_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.postNo === action.payload.postNo
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);

const actionCreators = {
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  postLikeDB,
  getOnePostDB,
};

export { actionCreators };

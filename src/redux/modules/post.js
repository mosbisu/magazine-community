import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import instance from "../../services/axios";

// action types
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// action creators
// get all posts from database
const setPost = createAction(SET_POST, (post_list) => ({
  post_list,
}));

// add post (content+image url) to database
const addPost = createAction(ADD_POST, (post) => ({ post }));

const editPost = createAction(EDIT_POST, (postNo, post) => ({ postNo, post }));

const deletePost = createAction(DELETE_POST, (postNo) => ({ postNo }));

// initialState (all the posts that this client has)
const initialState = {
  list: [],
};

// middleware
const getPostDB = () => {
  return function (dispatch, getState) {
    // get all posts from the database
    instance
      .get("/api/posts", {}) // 3번째 config
      .then(function (response) {
        dispatch(setPost(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const addPostDB = (post, navigate) => {
  return function (dispatch, getState) {
    instance
      .post("/api/posts", post)
      .then(function (response) {
        dispatch(addPost(post));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const editPostDB = (postNo, post, navigate) => {
  return function (dispatch, getState) {
    instance
      .put(`api/posts/${postNo}`, post)
      .then(function (response) {
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
        dispatch(deletePost(postNo));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// reducer immer

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
        // if push to the first position of an array
        // draft.list.unshift(action.payload.post);
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
  },
  initialState
);

const actionCreators = {
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
};

export { actionCreators };

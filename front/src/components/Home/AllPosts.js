import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";
// import Comment from "./Comment";

const AllPosts = () => {
  const [postData, setPostData] = useState([]);
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const date = Date.now();
  moment.locale("fr");

  const deletePost = (post_id) => {
    console.log(userId, post_id);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${post_id}`,
      withCredentials: true,
      data: {
        post_id,
        // post_user_id: userId,
      },
    })
      .then((res) => {
        console.log("Post supprimé !");
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    console.log(`commentaire sur le post ${postId}`);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
      withCredentials: true,
      data: {
        post_id: postId,
        author_id: userId,
        message: comment,
      },
    })
      .then((res) => {
        console.log("commentaire créé !");
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    setUserId(checkUserId);

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
      data: {
        user_id: checkUserId,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {postData.map((post, index) => {
        return (
          <>
            <div className="post-container">
              <div className="post-container-top">
                <img
                  className="post-users-img"
                  src="./img/default-contact-img.png"
                  alt=""
                />
                <p
                  key={`${post.user_firstname}${date}`}
                  className="post-container-top-name"
                >
                  {post.user_firstname} {post.user_lastname}
                </p>
                <p
                  key={post.date_creation}
                  className="post-container-top-date"
                  onClick={() => navigate(`/post/${post.post_id}`)}
                >
                  , {moment(post.date_creation).startOf("second").fromNow()}
                  {/* .slice(0, 10) */}
                </p>
              </div>
              <div
                className="post-container-message"
                key={`${post.user_firstname}${date}`}
              >
                {post.message}
              </div>
              <hr />
              <div className="post-container-end">
                <button className="post-container-end__like">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="post-container-end__like-i"
                  />
                </button>
                <button className="post-container-end__comment">
                  <FontAwesomeIcon icon={faMessage} />
                </button>

                <button
                  className="post-container-end__delete"
                  onClick={() => {
                    deletePost(post.post_id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
            {/* <Comment /> */}
            <div className="post-container-comments">
              <div className="post-container-comments-comment">
                <p className="comment-name">Axel Guichard</p>
                <p className="comment-content">Salut salut</p>
              </div>
              <div className="post-container-comments-comment">
                <p className="comment-name">Axel Guichard</p>
                <p className="comment-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita perspiciatis doloribus odio nulla quasi ex dicta
                  voluptate! Quidem et debitis ullam? Fuga reiciendis est a
                  voluptatum quaerat ipsa numquam hic?
                </p>
              </div>
              <div className="post-container-comments-users">
                <img
                  className="post-users-img"
                  src="./img/default-contact-img.png"
                  alt=""
                />
                <form action="" onSubmit={handlePostComment}>
                  <input
                    type="text"
                    placeholder="Écrivez un commentaire..."
                    className="input-comment"
                    onChange={(e) => {
                      setPostId(post.post_id);
                      setComment(e.target.value);
                    }}
                  />
                  <input
                    type="submit"
                    value="Poster"
                    className="publish-comment"
                  />
                </form>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AllPosts;

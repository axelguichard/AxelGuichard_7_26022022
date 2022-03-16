import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../components/Home/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";

const ReportedPosts = ({ fetchReportedPosts, post, isAdmin, userId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [postId, setPostId] = useState("");
  const [postUserId, setPostUserId] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  const handleProfilPage = () => {
    navigate(`/profil/${postUserId}`);
  };

  const removeReport = () => {
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.post_id}/report`,
      withCredentials: true,
      data: {
        postId: post.post_id,
        isAdmin,
      },
    })
      .then((res) => {
        fetchReportedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchLikes = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.post_id}/postLikedByUser`,
      withCredentials: true,
      data: {
        postId: post.post_id,
        userId: userId,
      },
    })
      .then((res) => {
        if (res.data[0]) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeCount = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post.post_id,
        userId: userId,
      },
    })
      .then((res) => {
        setCountLikes(res.data[0].total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post.post_id,
        userId: userId,
      },
    })
      .then((res) => {
        handleLikeCount();
      })
      .catch((err) => {
        console.log(`Echec like post : ${err}`);
      });
  };

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${post.post_id}`,
      withCredentials: true,
      data: {
        post_id: post.post_id,
        post_user_id: postUserId,
      },
    })
      .then((res) => {
        console.log("Post supprimé !");
        fetchReportedPosts();
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
    // refreshPage();
  };

  const fetchAllComments = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/comment/${post.post_id}/allcomments`,
      withCredentials: true,
      params: {
        id: post.post_id,
      },
    })
      .then((res) => {
        setAllComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchReportedPosts();
  }, []);

  useEffect(() => {
    if (!post.post_id == "") {
      handleLikeCount();
      fetchLikes();
    }
  }, [handleLike]);
  return (
    <>
      <div className="post-container">
        <div className="post-container-top">
          <img
            className="post-users-img"
            src="./img/default-contact-img.png"
            alt=""
          />

          <div className="post-container-top-infos">
            <p
              key={`${userId}${post.date_creation}`}
              className="post-container-top-name"
              onClick={handleProfilPage}
            >
              {post.user_firstname} {post.user_lastname}
            </p>
            <span
              key={`${post.post_user_id}`}
              className="post-container-top-date"
              onClick={() => navigate(`/post/${post.post_id}`)}
            >
              {moment(post.date_creation).startOf("second").fromNow()}
            </span>
          </div>
        </div>
        <div className="post-container-message" key={`${post.post_user_id}`}>
          {post.message}
        </div>
        <div className="post-container-countlikes">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="post-container-countlikes-icon"
          />
          <span className="post-container-countlikes-count">{countLikes}</span>
        </div>
        <hr />
        <div className="post-container-end">
          {isLiked && (
            <button onClick={handleLike} className="post-container-end__liked">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
            </button>
          )}
          {!isLiked && (
            <button onClick={handleLike} className="post-container-end__like">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
            </button>
          )}

          {isAdmin && (
            <button
              className="post-container-end__delete"
              onClick={() => {
                handleDelete(post.post_id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}
          <p onClick={removeReport}>Remove</p>
        </div>
      </div>
      <div className="post-container-comments">
        <Comments
          post={post}
          userId={userId}
          fetchAllComments={fetchAllComments}
          allComments={allComments}
        />
      </div>
    </>
  );
};

export default ReportedPosts;
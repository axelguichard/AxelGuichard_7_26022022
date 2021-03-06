import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Posts from "../../components/Home/Posts";
import UploadPost from "../../components/Home/UploadPost";
import Navbar from "../../components/Navigation/Navbar";
import axios from "axios";
import { Helmet } from "react-helmet";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

  const floatingPost = useRef();

  const navigate = useNavigate();

  const focusUpload = () => {
    floatingPost.current.focus();
  };

  const createTopPost = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(focusUpload, 500);
  };

  const fetchAllPosts = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        setAllPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const storageUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    setUserFirstName(
      JSON.parse(localStorage.getItem("user_info")).user.user_firstname
    );

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(storageUserId);
    fetchAllPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Groupomania - Accueil</title>
      </Helmet>
      <Navbar localUserId={userId} isAdmin={isAdmin} />
      <div className="container-bloc">
        <UploadPost
          fetchAllPosts={fetchAllPosts}
          userId={userId}
          userFirstName={userFirstName}
          navigate={navigate}
          floatingPost={floatingPost}
        />
        <Posts
          allPosts={allPosts}
          userId={userId}
          fetchAllPosts={fetchAllPosts}
          isAdmin={isAdmin}
        />
        <div className="float-create-container" onClick={createTopPost}>
          <button className="float-create-container-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

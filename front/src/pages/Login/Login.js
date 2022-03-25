import React from "react";
import SignInForm from "../../components/Log/SignInForm";
import TopLogoForm from "../../components/Log/TopLogoForm";

const Login = () => {
  document.title = `Groupomania - Connexion`;
  return (
    <>
      <TopLogoForm />
      <SignInForm />
    </>
  );
};

export default Login;

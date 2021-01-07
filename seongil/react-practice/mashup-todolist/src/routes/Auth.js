import AuthForm from "../components/AuthForm";
import { authService, firebaseInstance } from "../fbase";
import React from "react";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    authService.setPersistence(authService.Auth.Persistence.SESSION);
    console.log(data);
  };
  return (
    <div>
      <div>
        <AuthForm />
        <button onClick={onSocialClick} name="google">
          구글로 로그인
        </button>
        <button onClick={onSocialClick} name="github">
          깃허브로 로그인
        </button>
      </div>
    </div>
  );
};
export default Auth;

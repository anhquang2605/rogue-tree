import {useState, useEffect} from "react";

interface AuthenticationBannerProps {
    currentForm: string;
}

export default function AuthenticationBanner(props: AuthenticationBannerProps) {
    const {
        currentForm
    } = props;
   
    return (
        <div className="authentication-banner d-flex flex-column  col-6 justify-content-center align-items-center">
            <h1 className="text-center">
                {currentForm === "signIn" ? "Welcome to Rogue Tree" : "Let's create your account and start building your trees!"}
            </h1>
            <p className="text-center">Please sign in or sign up to continue.</p>
        </div>
    )
}
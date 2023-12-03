import React, { useState } from 'react';
import {signIn, getSession} from "next-auth/react";
import SignInForm from '@/components/authentication/signin-form/SignInForm';
import SignUpForm from '@/components/authentication/signup-form/SignUpForm';
import AuthenticationBanner from '@/components/authentication/authentication-banner/AuthenticationBanner';
import styles from './page-styles/authentication.module.css'
export default function Authentication() {
    const [currentForm, setCurrentForn] = useState("signIn");
    return (
    <div className={styles["authentication"]  + " d-flex row p-4"}>
        <AuthenticationBanner currentForm={currentForm}/>
        <div className={styles["authentication-forms"]  + " col-6"}>
        {
            currentForm === "signIn" ? 
            <SignInForm setCurrentForm={setCurrentForn}/> 
        :
            <SignUpForm setCurrentForm={setCurrentForn}/>
        }
        </div> 
    </div>
    )    
   
}   
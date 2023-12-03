import { useState } from "react";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/router";
interface SignInFormProps {
    setCurrentForm: (form: string) => void;
}
export default function SignInForm(props: SignInFormProps) {
    const {
        setCurrentForm
    } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [signStatus, setSignStatus] = useState("");//success, error, loading
    const router = useRouter();
    const onSignUpClick = () => {
        setCurrentForm("signUp");
    }
    const onSignInClick = async () => {
        setSignStatus("loading");
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        })
        if(result?.error) {
            setSignStatus("error");
        }else{
            setSignStatus("success");
            router.push("/");
        }
    }

    return (
        <div className="p-4">
            <h3 className="form-title w-full mb-4">
                Sign In
            </h3>
            <label className="form-label" htmlFor="email">Username</label>
            <input className="form-control p-4" type="email" id="email" name="email" />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control p-4" type="password" id="password" name="password" />
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
                </label>
            </div>
            <div className="group mt-4">
                <button onClick={onSignInClick} className="btn btn-primary me-4" type="submit">Sign In</button>
                <button onClick={
                    onSignUpClick
                } className="btn btn-warning">Sign Up</button>
            </div>
        </div>
    )
}
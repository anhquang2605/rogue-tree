import { useState } from "react";

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
    const onSignUpClick = () => {
        setCurrentForm("signUp");
    }
    return (
        <form className="p-4">
            <label className="form-label" htmlFor="email">Username</label>
            <input className="form-control" type="email" id="email" name="email" />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control" type="password" id="password" name="password" />
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
                </label>
            </div>
            <div className="group mt-4">
                <button className="btn btn-primary me-4" type="submit">Sign In</button>
                <button onClick={
                    onSignUpClick
                } className="btn btn-warning">Sign Up</button>
            </div>
        </form>
    )
}
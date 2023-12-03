import {useState, useEffect} from "react";

interface SignUpFormProps {
    setCurrentForm: (form: string) => void;
}

export default function SignUpForm(props: SignUpFormProps) {
    const{
        setCurrentForm
    } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onGoToSignInClick = () => {
        setCurrentForm("signIn");
    }
    return (
        <form className="p-4">
            <label className="form-label" htmlFor="email">Username</label>
            <input className="form-control" type="email" id="email" name="email" />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control" type="password" id="password" name="password" />
            <label className="form-label" htmlFor="password">Confirm Password</label>
            <input className="form-control" type="password" id="password" name="password" />
            <div className="group-of-btns mt-4">
                <button className="btn btn-primary me-4" type="submit">Sign Up</button>
                <button onClick={
                    onGoToSignInClick
                } className="btn btn-success">
                    Go to Sign In
                </button>
            </div>
        </form>
    )
}
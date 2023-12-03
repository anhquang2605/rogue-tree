interface SignUpFormProps {
    setCurrentForm: (form: string) => void;
}

/* export default function SignUpForm(props: SignUpFormProps) {
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
} */

import React, { useState, useEffect, ChangeEvent } from 'react'
import bcrypt from 'bcryptjs';
import ApiStatusPop from '../../api-status-pop/apistatuspop';
import style from './register.module.css';
const API_PREFFIX = "/api";
const PW_LENGTH = 8;
interface SignUpFormProps {
    setCurrentForm: (form: string) => void;
}
export default function SignUpForm(props: SignUpFormProps) {
    const{
        setCurrentForm
    } = props;
    //form states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userNameTouched, setUserNameTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
    //validation states
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [usernameLength, setUsernameLength] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [usernameExists, setUsernameExists] = useState(false)
/*     const [suggestionOn, setSuggestionOn] = useState(false)
    const [citiesSuggestion, setCitiesSuggestion] = useState<string[]>([]) */
    //password validation states
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [validPasswordMatch, setValidPasswordMatch] = useState(false)
    //api status
    const [apiStatus, setApiStatus] = useState({
        type: "idle",
        message: ""
    });
    const [showAPIPop, setShowAPIPop] = useState(false);    
    const onGoToSignInClick = () => {
        setCurrentForm("signIn");
    }
    //Form state handlers
    const handleUsernameChange = (event:ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setUsername(target?.value ?? '')

    }
    const handlePasswordChange = (event:ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setPassword(target?.value ?? '')
    }
    const handleConfirmPasswordChange = (event:ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setConfirmPassword(target?.value ?? '')

    }
/*     const handleLookUpCity = async (city:string) => {
        //setSuggestionOn(true)
        const citiesList = [...cities ?? []];
        const filteredCities = citiesList.filter((cityName) => {
            return cityName.toLowerCase().startsWith(city.toLowerCase())
        })
        return filteredCities
    } */
    const resetAllState = () => {
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setPasswordMatch(false)
        setUsernameLength(false)
        setPasswordLength(false)
        setUsernameExists(false)
        setValidPassword(false)
        setValidPasswordMatch(false)
        setUserNameTouched(false)
        setPasswordTouched(false)
        setConfirmPasswordTouched(false)
        setShowAPIPop(false);
    }

    //form validation
    const validateUsername = () => {
        setUserNameTouched(true)
        if (username.length < 5) {
            setUsernameLength(false)
        } else {
            setUsernameLength(true)
        }
    }
    const validatePassword = () => {
        setPasswordTouched(true)
        if (password.length < 5) {
            setPasswordLength(false)
        } else {
            setPasswordLength(true)
        }
        validatePasswordPattern(password)
    }
    const validatePasswordPattern = (pw:string) => {
        setPasswordLength(pw.length >= PW_LENGTH)
    }


    const validatePasswordMatch = () => {
        setConfirmPasswordTouched(true)
        if (password === confirmPassword) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }
    const validateUsernameExists = async () => {
        const response = await fetch(API_PREFFIX + "/user-by-name/?username=" + username);
        const data = await response.json();
        const existingUser = data.user;
        if (existingUser) {
            setUsernameExists(true)
        } else {
            setUsernameExists(false)
        }
    }
    
    const handleSubmit = (event:any) => {
        const touched = userNameTouched && passwordTouched && confirmPasswordTouched;
        if(!touched){
            setUserNameTouched(true)
            setPasswordTouched(true)
            setConfirmPasswordTouched(true)
        }
        const valid = passwordMatch && usernameLength && passwordLength && !usernameExists
        if (valid) {
            const newUser = {
                username: username,
                password: bcrypt.hashSync(password, 10),
            }
            setShowAPIPop(true);
            setApiStatus({
                type: "loading",
                message: "Adding user..."
            });
            fetch(API_PREFFIX + "/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            }).then(response => {
                if (response.status === 200) {
                    setApiStatus(
                        {
                            type: "success",
                            message:"User added successfully"}
                        );
                    resetAllState();
                } else {
                    setApiStatus(
                        {
                            type: "error",
                            message:"Error adding user, please try again later"
                        });
                }

            })
           // addUser(username, password, email, null)
        }
    }
    useEffect(() => {
        setValidPassword(!passwordTouched || passwordLength);
    }, [passwordTouched, passwordLength])
    useEffect(() => {
        setValidUsername(!userNameTouched || usernameLength && !usernameExists);
    }, [userNameTouched, usernameLength, usernameExists])
  
    useEffect(() => {
        setValidPasswordMatch(!confirmPasswordTouched || passwordMatch);
    }, [confirmPasswordTouched, passwordMatch])

    return (
        <>
            <ApiStatusPop  redirectPageName='Login' redirectDuration={3} status={apiStatus} setApiStatus={setApiStatus} show={showAPIPop} setReveal={setShowAPIPop}redirectButtonText='Go to Login Page' redirect="/authentication/login"/>
            <div className={"glass flex flex-col " + style['form-container']}>
                <div className="form-container flex-row w-3/5 my-auto mx-auto">
                    <h3 className="form-title w-full">
                        Register
                    </h3>
                    <div className="lg:half form-row lg:mr-4 w-full mr-0">
                        <label>
                            Username
                        </label>
                        <input type="text" className={"p-4 border rounded border w-full "+ (validUsername ? "" : " border-red-400")} placeholder="Username" value={username} onChange={handleUsernameChange} onBlur={()=>{
                            validateUsername()
                            validateUsernameExists()
                        }} />
                        {<p className={"text-red-400 " + (validUsername && "opacity-0")}>{!usernameLength ? "Username must be at least 5 characters long" : ""} {usernameExists&&"Username already existed!"}</p>}
                    </div>
                    <div className="form-row lg:half lg:mr-4 w-full mr-0">
                        <label>
                            Password
                        </label>
                        <input type="password" value={password} className={"p-4 border rounded self-start border w-full"+ (validPassword ? "" : " border-red-400")} placeholder="Password" onChange={handlePasswordChange} onBlur={()=>{
                                validatePassword()
                            }}/>
                        <ul className={"" + (validPassword && "opacity-0")}>
                            Password must contain:
                            <li className={"text-red-400 " + (passwordLength && "line-through")}>At least 5 characters</li>
                        </ul>
                    
                    </div>
                    <div className="form-row lg:half w-full">
                        <label>
                            Confirm Password
                        </label>
                        <input type="password" value={confirmPassword}  className={"p-4 border rounded "+ (validPasswordMatch ? "" : "border-red-400")} placeholder="Retype password to confirm" onChange={handleConfirmPasswordChange} onBlur={()=>{
                                validatePasswordMatch()
                                validatePassword()
                            }} />
                            {<p className={"text-red-400 " + (validPasswordMatch && "opacity-0")}>Passwords do not match!</p>}
                    </div>

                  

                   
                    <button onClick={handleSubmit} className="action-btn w-full">Register</button>
                </div>
                
            </div>
        </>
    )
}
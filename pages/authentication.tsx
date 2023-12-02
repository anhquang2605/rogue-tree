import React, { useState } from 'react';
import {signIn, getSession} from "next-auth/react";
export default function Authentication() {
    const [currentForm, setCurrentForn] = useState("signIn");
    
}   
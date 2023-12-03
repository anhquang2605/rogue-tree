import { ObjectId } from "mongodb"

export type User = {
    _id?: string | ObjectId;
    username: string;
    password: string; //after hashed with salt
    themePrefered?: string; //dark or light
    fontSize?: number; //font size of the text
    soundEffectON?: boolean; //sound effect on or off
    startUpPagePreference?: string; //the page that the user will see when they first login
}

export interface UserInSession{
    username: string | null | undefined; 
    name?: string | null | undefined; 
    email?: string | null | undefined; 
    image?: string | null | undefined; 
    location?: Location | null | undefined;
    remember?: boolean,
}
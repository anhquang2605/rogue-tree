import { ObjectId } from "mongodb"

export type User = {
    _id: string | ObjectId;
    username: string;
    salt: string;
    token: string; //after hashed with salt
    themePrefered: string; //dark or light
    fontSize: number; //font size of the text
    soundEffect: boolean; //sound effect on or off
    startUpPage: string; //the page that the user will see when they first login
}
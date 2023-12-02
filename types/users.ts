import { ObjectId } from "mongodb"

export type User = {
    _id: string | ObjectId;
    username: string;
    salt: string;
    token: string; //after hashed with salt
}
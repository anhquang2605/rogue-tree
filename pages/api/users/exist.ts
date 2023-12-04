import { NextApiRequest,NextApiResponse } from "next";
import { connectDB } from "@/libs/mongodb";

export default async (req:NextApiRequest,res:NextApiResponse) => {
  const  db  = await connectDB();
  const { username } = req.body;
  if(db){
    const user = await db.collection("users").findOne({ username });
    const exist = user ? true : false;
    res.status(200).json({ success: true, exist: exist });
  } else {
    res.status(500).json({ success: false, message: "DB Connection Error" });
  }
  
};

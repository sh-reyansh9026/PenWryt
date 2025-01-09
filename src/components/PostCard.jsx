// import appwriteService from '../appwrite/config'
// import { Link } from 'react-router-dom'

// function PostCard({ $id, title, featuredImage }) {

//     return (
//         <Link to={`/post/${$id}`}>
//             <div className='w-full bg-violet-500 rounded-xl p-4'>
//                 <div className='w-full justify-center mb-4 '>
//                     <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
//                 </div>
//                 <h2
//                     className='text-xl font-bold text-white'
//                 >{title}</h2>
//             </div>
//         </Link>
//     )
// }

// export default PostCard

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            height: 200, // Fixed height for media
            objectFit: "cover", // Ensures image fills dimensions without distortion
            borderRadius: "4px", // Optional: Adds slight rounding for better design
          }}
          image={appwriteService.getFilePreview(featuredImage)}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <div style={{ backgroundColor: "#2d2d2d" }}>
          <Link to={`/post/${$id}`}>
            <button className="bg-gray-900 rounded-md text-wrap text-white hover:bg-gray-800 w-40 h-10 m-2">
              See Post
            </button>
          </Link>
        </div>
      </CardActionArea>
    </Card>
  );
}

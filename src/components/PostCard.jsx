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
import Grid from "@mui/material/Grid"; // For responsiveness
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {/* Material-UI Grid for responsiveness */}
      <Card
        sx={{
          maxWidth: "100%", // Makes card fit its container
          margin: "auto", // Centers card
          boxShadow: 3, // Optional: Adds subtle shadow for depth
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{
              height: { xs: 150, sm: 200 }, // Dynamic height for different breakpoints
              objectFit: "cover", // Ensures image fills dimensions without distortion
              borderRadius: "4px", // Optional: Adds slight rounding
            }}
            image={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive text size
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
          </CardContent>
          <div
            style={{
              backgroundColor: "#2d2d2d",
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem",
            }}
          >
            <Link to={`/post/${$id}`}>
              <button className="bg-gray-900 rounded-md text-wrap text-white hover:bg-gray-800 px-4 py-2">
                See Post
              </button>
            </Link>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

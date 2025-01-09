import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Container>
        <h1 className="text-2xl font-bold text-center mb-6">Edit Post</h1>
        <div className="max-w-4xl mx-auto">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
}

export default EditPost;

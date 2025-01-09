import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useState, useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap justify-center text-center">
            <h1 className="text-2xl font-bold">There are no posts yet.</h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) =>
            post.status === "active" ? (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

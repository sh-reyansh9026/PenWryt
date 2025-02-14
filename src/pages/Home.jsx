import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0 && userData === null) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <Link to="/login">
                <button className="bg-slate-700 hover:bg-blue-950 text-white font-bold p-4 rounded-md">
                  <h1 className="text-2xl text-center">Login to read</h1>
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) =>
            post.status === "active" ||
            (userData && userData.$id === post.userId) ? (
              <PostCard key={post.$id} {...post} />
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;

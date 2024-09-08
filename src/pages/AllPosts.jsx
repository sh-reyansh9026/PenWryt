import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { useState, useEffect } from 'react'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })

    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        post.status === 'active' ?
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div> : null
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
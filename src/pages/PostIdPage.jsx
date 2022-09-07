import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostByid, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data)
    })

    useEffect(()=>{
        fetchPostByid(params.id)
        fetchComments(params.id)
    }, []);
    return (
        <div>
            <h1>страница поста c ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>
                    <div>{post.title}</div>
                    <div>{post.body}</div>
                </div>
            }
            <h1>Коментарии</h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.length}

                    {comments.map((comm, i) =>
                        <div key={i} style={{ marginTop: '15px' }}>
                            <h2>{comm.email}</h2>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
     );
}

export default PostIdPage;
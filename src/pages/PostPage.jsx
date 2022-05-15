import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [getPost, isPostLoading, postError] = useFetching(async () => {
        const post = await PostService.getPost(params.id)
        setPost(post.data)
    })
    const [getComments, isCommentsLoading, comError] = useFetching(async () => {
        const comments = await PostService.getPostComments(params.id)
        setComments(comments.data)
    })

    useEffect(() => {
        getPost()
        getComments()
    }, []);

    return (
        <div>
            <h1>PostPage: {params.id}</h1>
            {isPostLoading
                ? <Loader/>
                : <div>{post.title}</div>
            }
            <h1>Comments</h1>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment =>
                        <div style={{marginTop: 15}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostPage;

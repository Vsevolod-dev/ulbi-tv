import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./PostPage.module.css"
import MyInput from "../../components/UI/input/MyInput";
import MyButton from "../../components/UI/button/MyButton";

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [getPost, isPostLoading, postError] = useFetching(async () => {
        const post = await PostService.getPost(params.id)
        setPost(post.data)
    })
    const [getComments, isCommentsLoading, comError] = useFetching(async () => {
        const comments = await PostService.getPostComments(params.id)
        setComments(comments.data)
    })
    const [createComment, isCreateCommentLoading, comCreateError] = useFetching(async (newComment) => {
        const response = await PostService.createComments({
            body: newComment,
            postId: params.id
        })
        if (response.status === 201) {
            setComments([...comments, response.data[0]])
        }
    })

    useEffect(() => {
        getPost()
        getComments()
    }, []);

    const addNewComment = (e) => {
        e.preventDefault()
        createComment(newComment)
        setNewComment('')
    }

    return (
        <div className={classes.post__page}>
            {isPostLoading || post.owner === undefined
                ? <Loader/>
                : <div>
                    <h1>Posted by {post.owner.login}</h1>
                    <div className={classes.post__body}>
                        <h2>
                            {post.title}
                        </h2>
                        <div>
                            {post.body}
                        </div>
                    </div>
                </div>
            }
            <h1>Comments</h1>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment =>
                        <div
                            key={comment._id}
                            style={{marginTop: 15}}
                        >
                            <h5>{comment.owner.login}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
            <form>
                <MyInput
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    type="text"
                    placeholder={"Add comment..."}
                />
                <MyButton onClick={addNewComment}>Add</MyButton>
            </form>
        </div>
    );
};

export default PostPage;

import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../utils/helpers";

const PostItem = (props) => {
    const {title, body} = props.post
    const owner  = props.post.owner.login
    const navigate = useNavigate()
    const deleteEnabled = props.post.owner._id === getCookie('userId')

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.number}. {title}</strong>
                <div>{body}</div>
                <div><strong>Created by: </strong>{owner}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post._id}`)}>Open</MyButton>
                {deleteEnabled && <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>}
            </div>
        </div>
    );
};

export default PostItem;

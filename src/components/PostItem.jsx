import React from 'react';
import Button from "./UI/button/Button";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const router = useNavigate()
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className="post__btns">
                <Button onClick={() => router(`/posts/${props.post.id}`)}>Открыть</Button>
                <Button onClick={() => props.remove(props.post)}>Удалить</Button>
            </div>
        </div>
    );
};

export default PostItem;
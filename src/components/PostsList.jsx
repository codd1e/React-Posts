import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostsList = ({posts, remove}) => {

    if(!posts.length) {
        return <h1 style={{textAlign: 'center'}}>Список постов пуст</h1>
    }

    return (
        <div className="postsList">
            <h1 style={{textAlign: "center"}}>Список постов</h1>
            <TransitionGroup>
                {posts.map((post, index) => (
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem number={index + 1} key={post.id} post={post} remove={remove}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default PostsList;
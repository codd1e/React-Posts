import React, {useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <h2 style={{textAlign: 'center'}}>Create Post</h2>
            <Input
                type="text"
                placeholder="Название поста"
                value={post.title}
                onChange={event => setPost({...post, title: event.target.value})}
            />
            <Input
                type="text"
                placeholder="Описание поста"
                value={post.body}
                onChange={event => setPost({...post, body: event.target.value})}
            />
            <Button onClick={addNewPost}>Добавить пост</Button>
        </form>
    );
};

export default PostForm;
import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const MyPostFrom = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''});
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');
    // const bodyInputRefDescription = useRef() //unmanaged component

    const addNewPost = (e) => {
        e.preventDefault()
        // console.log(bodyInputRefDescription.current.value) //unmanaged component
        // const newPost = {
        //     id: Date.now(), title, body
        // }
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        // setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: '', body: ''})
    }

    return (
        <form>
            {/*managed component*/}
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder={"Post name"}
            />
            <MyInput
                // ref={bodyInputRefDescription} //unmanaged component
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder={"Post description"}
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    );
};

export default MyPostFrom;

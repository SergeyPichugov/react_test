import React, {  useState } from 'react';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {

	// const [title, setTitle] = useState('');
	// const [body, setBody] = useState('');
    const [post, setPost] = useState({title:'',body:''});

    const addNewPost = (e) => {
		e.preventDefault();

		const newPost = {
			...post, id: Date.now(),
		}
		// setPosts([...posts, newPost]);
		// setTitle('');
		// setBody('');
        create(newPost)

		setPost({title:'',body:''});
	}



    return (
        <form>
            {/* управляемый компонент */}
            {/* <MyInput
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text"
                placeholder="название"
            />
            <MyInput
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                type="text"
                placeholder="Описание"
            /> */}
            {/* НЕуправляемый компонент */}
            {/* <MyInput
                ref={bodyInputRef}
                type="text"
                placeholder="Описание"
            /> */}
            <MyInput
                value={post.title}
                onChange={(e)=>setPost({...post, title: e.target.value})}
                type="text"
                placeholder="название"
            />
            <MyInput
                value={post.body}
                onChange={(e)=>setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание"
            />
            <MyButton onClick={addNewPost}>Создать</MyButton>


        </form>
     );
}

export default PostForm;
import axios from 'axios';
import React, {  useEffect, useMemo, useState } from 'react';
import Counter from './component/counter';
import PostFilter from './component/PostFilter';
import PostForm from './component/postForm';
import PostItem from './component/postItem';
import PostList from './component/postList';
import MyButton from './component/UI/button/MyButton';
import MyInput from './component/UI/input/MyInput';
import MyModal from './component/UI/MyModal/MyModal';
import MySelect from './component/UI/select/MySelect';
import { usePost } from './hooks/usePost';
import './styles/app.scss'

function App() {
  
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({sort:'', query:''});
  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
  

  useEffect(() => {
    fetchPosts()
  },[])

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  };

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(response.data)
  }

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  };

  

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={()=> setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin:'15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про javaScript"/>
    </div> 
  );
}

export default App;

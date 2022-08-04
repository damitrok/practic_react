import React, {  useMemo, useState } from 'react';
import Counter from './component/counter';
import PostFilter from './component/PostFilter';
import PostForm from './component/postForm';
import PostItem from './component/postItem';
import PostList from './component/postList';
import MyButton from './component/UI/button/MyButton';
import MyInput from './component/UI/input/MyInput';
import MyModal from './component/UI/MyModal/MyModal';
import MySelect from './component/UI/select/MySelect';
import './styles/app.scss'

function App() {
  
  const [posts, setPosts] = useState([
    {id: '1', title: 'javaScript', body: 'бб'},
    {id: '2', title: 'аа', body: 'аа'},
    {id: '3', title: 'бб' , body: 'гг'},
    {id: '4', title: 'вв', body: 'яя'}
  ]);

  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({sort:'', query:''});

  const sortedPosts = useMemo(()=>{
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  },[filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(()=>{
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  },[filter.query, sortedPosts]);

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  };

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

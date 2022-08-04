import React, {  useState } from 'react';
import Counter from './component/counter';
import PostForm from './component/postForm';
import PostItem from './component/postItem';
import PostList from './component/postList';
import MySelect from './component/UI/select/MySelect';
import './styles/app.scss'

function App() {
  
  const [posts, setPosts] = useState([
    {id: '1', title: 'javaScript', body: 'бб'},
    {id: '2', title: 'аа', body: 'аа'},
    {id: '3', title: 'бб' , body: 'гг'},
    {id: '4', title: 'вв', body: 'яя'}
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) =>{
    setPosts([...posts, newPost])
  }

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))

  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin:'15px 0'}}/>
      <div> 
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue = "Сортировка по"
          options={[
            {value: 'title', name: 'По заголовку'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>
      {posts.length 
        ? <PostList remove={removePost} posts={posts} title="Посты про javaScript"/>
        : <h1 style={{textAlign: ' center'}}>Посты не были найдены!</h1>
      }
      
    </div> 
  );
}

export default App;

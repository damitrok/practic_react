import axios from 'axios';
import React, {  useEffect, useMemo, useState } from 'react';
import PostService from './API/postService';
import Counter from './component/counter';
import PostFilter from './component/PostFilter';
import PostForm from './component/postForm';
import PostItem from './component/postItem';
import PostList from './component/postList';
import MyButton from './component/UI/button/MyButton';
import MyInput from './component/UI/input/MyInput';
import Loader from './component/UI/loader/Loader';
import MyModal from './component/UI/MyModal/MyModal';
import Paginations from './component/UI/paginations/Paginations';
import MySelect from './component/UI/select/MySelect';
import { useFetch } from './hooks/useFetch';
import { usePost } from './hooks/usePost';
import './styles/app.scss'
import { getPageCount, getPagesArray } from './utils/pages';

function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({sort:'', query:''});
  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
  

  const [fetchPosts, isPostsLoading, postError] = useFetch(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  },[page])

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  };

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit,page)
  }

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
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display:'flex', justifyContent:'center', marginTop:50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про javaScript"/>
      }
      <Paginations page={page} changePage={changePage} totalPages={totalPages}/>
    </div> 
  );
}

export default App;

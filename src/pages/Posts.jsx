import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyPostFrom from "../components/PostForm";
import PostFilter from "../components/UI/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1))


    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <MyPostFrom create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={limit => setLimit(limit)}
                defaultValue={'Numbers of elements on page'}
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'},
                ]}
            />
            {postError && <h1 style={{textAlign: 'center', marginTop: '1rem'}}>An error has occurred!{postError}</h1>}

            {isPostsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                <Loader/>
            </div>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Post list '}/>
            <div ref={lastElement} style={{height: 20}}/>
            <Pagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default Posts;

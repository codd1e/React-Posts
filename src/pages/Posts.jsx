import '../styles/App.css'
import {useEffect, useRef, useState} from "react";
import PostService from "../API/PostService"
import Button from "../components/UI/button/Button";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostsList from "../components/PostsList";
import Pagination from "../components/UI/pagination/Pagination";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFethcing";
import {getPageCount} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts,...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit])

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    }

    return (
        <div className="App">
            <Button style={{marginTop: "15px"}} onClick={() => setModal(!modal)}>
                Create Post
            </Button>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-вл элементов на странице"
                options={[
                    {value: 5,name: '5'},
                    {value: 10,name: '10'},
                    {value: 25,name: '25'},
                    {value: -1,name: 'All'}
                ]}
            />
            {postsError &&
                <h1>Произошла ошибка ${postsError}</h1>
            }
            {isPostsLoading
                ?  <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/>
                </div>
                :  <PostsList posts={sortedAndSearchPosts} remove={removePost}/>
            }
            <div ref={lastElement} style={{height: 0.01, background: 0}}></div>
            <Pagination changePage={changePage} page={page} totalPages={totalPages}/>
        </div>
    );
}

export default Posts;

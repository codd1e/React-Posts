import "./styles/App.css"
import {useEffect, useState} from "react";
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import Button from "./components/UI/button/Button";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFethcing";
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    useEffect(() => {
        fetchPosts()
    }, [page])

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page)
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
            {postsError &&
                <h1>Произошла ошибка ${postsError}</h1>
            }
            {isPostsLoading
                ?  <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        <Loader/>
                    </div>
                :  <PostsList posts={sortedAndSearchPosts} remove={removePost}/>
            }
            <Pagination changePage={changePage} page={page} totalPages={totalPages}/>
        </div>
    );
}

export default App;

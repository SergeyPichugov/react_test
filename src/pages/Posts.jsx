import { useRef, useState } from "react";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";

import { useEffect } from "react";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import { useFetching } from "../hooks/useFetching";
import '../styles/App.css';
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {

	const [likes, setLikes] = useState(0);
	const [value, setValue] = useState('текст бла бла бла');
	function increment() {
		setLikes(likes + 1)
	}
	function decrement() {
		setLikes(likes - 1)
	}

	const [posts, setPosts] = useState([
		// { id: 1, title: 'aaa', body: 'd текст поста' },
		// { id: 2, title: 'bbb1', body: 'c текст поста' },
		// { id: 3, title: 'ccc', body: 'b текст поста' },
		// { id: 4, title: 'ddd3', body: 'a текст поста' },
		// { id: 5, title: 'какое то название4', body: 'текст поста' },
	])

	// const [selectedSort, setSelectedSort] = useState('');
	// const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);

	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	// const [isPostsLoading, setIsPostsLoading] = useState(false);
	const lastElement = useRef();


	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page)
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit))
		// setTotalCount(response.data);
	})
	// const bodyInputRef = useRef();

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    });

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page,limit]);


	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}


	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	// const sortPosts = (sort) => {
	// 	// console.log('sort: ', sort);
	// 	setSelectedSort(sort)
	// }


	const changePage = (page) => {
		setPage(page);
	}

	return (
		<div className="App">

			<MyButton style={{ marginTop: '30px' }} onClick={fetchPosts}>
				Получить посты
			</MyButton>
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost}/>
			</MyModal>


			<hr style={{ margin: '15px' }}/>

			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'показать все'},
                ]}
            />

			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			}

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'первый список'}/>

            <div ref={lastElement} style={{ height: '20px', background: 'red' }}></div>

			{isPostsLoading &&
	            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Loader></Loader>
                </div>
			}

			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
			{/* https://youtu.be/GNrdg3PzpJQ?t=7930 */}


			{/* <header className="App-header bg-gray-100">
        <p>
          { likes }
        </p>
        <p>
          { value }
        </p>

        <div className="">
          <input
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <button onClick={increment} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">добавить</button>
          <button onClick={()=>setLikes(p=> p + 1)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">добавить</button>
          <button onClick={decrement}>убрать</button>
        </div>

      </header>
      <Counter/>
      <hr/>
      <ClassCounter/> */}





		</div>
	);
}

export default Posts;

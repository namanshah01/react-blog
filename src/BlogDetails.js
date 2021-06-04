import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "./AxiosSetUp";
// import useFetch from "./useFetch";

const BlogDetails = () => {
	const { slug } = useParams();
	// const { data: blog, isLoading, error } = useFetch(`http://localhost:8000/api/blog/${slug}/`);
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [blog, setBlog] = useState('')
	const [error, setError] = useState('')
	const history = useHistory();

	useEffect(() => {
		axiosInstance.get(`blog/${slug}/`)
		.then((res) => {
			setBlog(res.data)
			// setTitle(res.data.title)
			// setBody(res.data.body)
			// setUser(res.data.username)
			setIsLoading(false)
		})
		.catch((error) => {
			if (error.response) {setError(error.response.data)}
			else {setError(error.message)}
			setIsLoading(false)
		});
	}, [])

	const handleClick = () => {
		setIsPending(true);
		axiosInstance.delete(`blog/${slug}/`)
		.then(() => {
			console.log('created');
			setIsPending(false);
			history.push('/');
		});
	}

	let username = false
	localStorage.getItem('username') ? username = localStorage.getItem('username') : username = false

	return isLoading ? (<div>Loading...</div>) : (
		<div className="blog-details">
			{error && <div>{error}</div>}
			{/* {console.log('username var: ', username)}
			{console.log('username var type: ', typeof(username))}
			{console.log('author: ', blog.username)}
			{console.log('author type: ', typeof(blog.username))} */}
			{blog && (
				<article>
					<h2>{ blog.title }</h2>
					<p>Written by, { blog.username }</p>
					<div>{ blog.body }</div>
					{blog.username === username && <Link className="padding-right" to={`/blog/${slug}/update`}><button>Update</button></Link>}
					{blog.username === username && !isPending && <button onClick={handleClick}>Delete</button>}
					{blog.username === username &&  isPending && <button disabled>Deleting Blog...</button>}
				</article>
			)}
		</div>
	);

	// return (
	// 	<div className="blog-details">
	// 		{isLoading && <div>Loading...</div>}
	// 		{error && <div>{error}</div>}
	// 		{blog && (
	// 			<article>
	// 				<h2>{ blog.title }</h2>
	// 				<p>Written by, { blog.username }</p>
	// 				<div>{ blog.body }</div>
	// 				<Link className="padding-right" to={`/blog/${slug}/update`}><button>Update</button></Link>
	// 				{ !isPending && <button onClick={handleClick}>Delete</button> }
	// 				{ isPending && <button disabled>Deleting Blog...</button> }
	// 			</article>
	// 		)}
	// 	</div>
	// );
}

export default BlogDetails;
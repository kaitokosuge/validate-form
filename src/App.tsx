import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { validationRules } from "./Validate";

function App() {
	interface Post {
		title: string;
		content: string;
		location: number;
	}
	const [posts, setPosts] = useState<Post>({
		title: "",
		content: "",
		location: Number(""),
	});

	const handleFormChange = (e: any) => {
		if (e.target.name === "location") {
			setPosts({
				...posts,
				[e.target.name]: Number(e.target.value),
			});
			setIsError((prev) => ({
				...prev,
				[e.target.name]: "",
			}));
		} else {
			setPosts({
				...posts,
				[e.target.name]: e.target.value,
			});
			setIsError((prev) => ({
				...prev,
				[e.target.name]: "",
			}));
		}
	};
	useEffect(() => {
		console.log(posts);
	}, [posts]);

	//validationクリア後に実行される関数
	const fetchPost = (e: any, num: number) => {
		e.preventDefault();
		alert(`"ok!"${posts.title}${posts.location},${num}`);
	};
	const [isError, setIsError] = useState({
		title: "",
		content: "",
		location: "",
	});

	//validation処理
	const handleClickValidateFetch = (e: any) => {
		e.preventDefault();
		console.log("postobjkeys", Object.keys(posts));
		let hasError = false;
		Object.keys(posts).forEach((name) => {
			let value: string | number = posts[name as keyof Post];
			const rule = validationRules[name as keyof Post];
			if (rule.rule(value)) {
				//こっちだと動かない
				// setIsError({
				// 	...isError,
				// 	[name]: rule.message,
				// });
				//こっちだと動く
				setIsError((prev) => ({
					...prev,
					[name]: rule.message(value),
				}));
				console.log("isError", isError);
				hasError = true;
			}
			// } else if (typeof value === "number") {
			// 	if (rule.rule(value)) {
			// 		setIsError((prev) => ({
			// 			...prev,
			// 			[name]: rule.message(value),
			// 		}));
			// 		console.log("isError", isError);
			// 		hasError = true;
			// 	}
			// }
			// console.log("rule", rule);
		});

		if (hasError) {
			return;
		}
		if (window.confirm("公開しますか？")) {
			fetchPost(e, 0);
			setPosts({
				title: "",
				content: "",
				location: Number(""),
			});
		}
	};

	return (
		<>
			<form className="text-center mt-[200px]">
				<div>
					<p className="font-bold">title</p>
					<input
						onChange={handleFormChange}
						value={posts?.title}
						type="text"
						className="border p-1"
						name="title"
					/>
					<p className="text-red-400">{isError.title}</p>
				</div>
				<div className="mt-5">
					<p className="font-bold">content</p>
					<input
						onChange={handleFormChange}
						value={posts?.content}
						type="text"
						className="border p-1"
						name="content"
					/>
					<p className="text-red-400">{isError.content}</p>
				</div>
				<div className="mt-5">
					<p className="font-bold">location</p>
					<select
						onChange={handleFormChange}
						value={posts?.location}
						className="border p-1"
						name="location">
						<option value="0"></option>
						<option value="1">Tokyo</option>
						<option value="2">NewYork</option>
					</select>
					<p className="text-red-400">{isError.location}</p>
				</div>
				<button
					onClick={handleClickValidateFetch}
					className="mt-10 border px-5 py-[10px]">
					post
				</button>
			</form>
		</>
	);
}

export default App;

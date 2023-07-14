import { useState, useEffect } from 'react';

const API = `http://www.omdbapi.com/?apikey=807b139b&`;

function Search({ onSearch }) {
	return (
		<input
			type="text"
			placeholder="Search"
			className="input input-bordered w-30 md:w-auto"
			onChange={(e) => onSearch(e.target.value)}
		/>
	);
}

function Ratings({ forMovie, setMyWatchList, myWatchList }) {
	const [myRating, setMyRating] = useState(1);
	const { Title, imdbRating, Runtime, Poster, imdbID: id } = forMovie;
	const movieData = { ...forMovie, myRating };
	const [isRated, setIsRated] = useState(() => {
		const found = myWatchList.findIndex((item) => item.imdbID === id);
		return found !== -1;
	});

	return (
		<>
			{isRated == false ? (
				<div className="alert flex justify-center items-center min-w-fit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>

					<div className="rating">
						{Array.from({ length: 10 }).map((_, index) => {
							return (
								<input
									type="radio"
									name="rating-2"
									className="mask mask-star-2 bg-orange-400"
									defaultChecked={index + 1 == myRating}
									onClick={() => {
										setMyRating(index + 1);
									}}
									key={index} //index as key is fine here as its non mutating⚠️
								/>
							);
						})}

						<button className="btn btn-sm">(You rated {myRating}/10)</button>
					</div>
					<div>
						<button
							className="btn btn-sm btn-primary"
							onClick={() => {
								setMyWatchList((prev) => [...prev, movieData]);
								setIsRated(true);
							}}
						>
							add to watchlist
						</button>
					</div>
				</div>
			) : (
				<div className="alert alert-warning w-3/5 m-auto flex justify-center text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>You have rated this movie 🙂👍🏻!</span>
				</div>
			)}
		</>
	);
}
function Stats({ imdbRating, imdbVotes, boxOffice = 'N/A' }) {
	return (
		<div className="stats bg-base-200">
			<div className="stat">
				<div className="stat-figure text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-8 h-8 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>
					</svg>
				</div>
				<div className="stat-title">IMDB Rating</div>
				<div className="stat-value text-primary">{imdbRating}</div>
			</div>
			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-8 h-8 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						></path>
					</svg>
				</div>
				<div className="stat-title">Total IMDB Votes</div>
				<div className="stat-value text-secondary">{imdbVotes}</div>
			</div>
			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-8 h-8 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
						></path>
					</svg>
				</div>
				<div className="stat-title">Box Office</div>
				<div className="stat-value">{boxOffice}</div>
			</div>
		</div>
	);
}

function NavBar({ onSearch, totalResults }) {
	const [theme, setTheme] = useState(() => {
		const myTheme = localStorage.getItem('myTheme');
		if (myTheme) return JSON.parse(myTheme);
		return 'lofi';
	});

	const toggleTheme = () => {
		setTheme(theme === 'lofi' ? 'dracula' : 'lofi');
	};

	useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', theme);
		localStorage.setItem('myTheme', JSON.stringify(theme));
	}, [theme]);

	return (
		<div className="navbar bg-base-200 justify-evenly">
			<div className="">
				<a className="btn btn-ghost normal-case text-xl">Movie App🎦</a>
				<div className="form-control">{<Search onSearch={onSearch} />}</div>
			</div>
			<div className="flex space-x-">
				<button className="btn btn-info rounded-full">
					Found {totalResults} Results
				</button>
				<label className="swap swap-rotate">
					{/* this hidden checkbox controls the state */}
					<input type="checkbox" onChange={toggleTheme} />

					{/* sun icon */}
					<svg
						className="swap-on fill-current w-10 h-10"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
					</svg>

					{/* moon icon */}
					<svg
						className="swap-off fill-current w-10 h-10"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
					</svg>
				</label>
			</div>
		</div>
	);
}

function ShowMovies({ children }) {
	return (
		<section className="grid grid-cols-2 gap-x-2 items-stretch">
			{children}
		</section>
	);
}

function MovieResults({
	query,
	handleClick,
	movies,
	setMovies,
	setImdbId,
	setShowWatchList,
}) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`${API}&s=${query}`);
				const data = await response.json();
				setMovies(data.Search ?? movies);
			} catch (error) {
				console.error('Error fetching movies:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, [query]);

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
					Getting results...
					<span className="loading loading-spinner loading-lg">
						Getting Results
					</span>
				</div>
			) : (
				<div className="flex flex-col min-h-screen space-y-4 max-h-screen justify-between  overflow-y-scroll">
					{movies.map(({ Title, Year, Poster, imdbID }) => (
						<Movie
							Title={Title}
							Year={Year}
							Poster={Poster}
							key={imdbID}
							imdbID={imdbID}
							handleClick={handleClick}
							setShowWatchList={setShowWatchList}
						/>
					))}
				</div>
			)}
		</>
	);
}

function Movie({ Title, Year, Poster, imdbID, handleClick, setShowWatchList }) {
	return (
		<div className="card card-side bg-base-100 shadow-xl">
			<figure>
				<img className="h-52 w-48" src={Poster} alt="Movie" />
			</figure>
			<div className="card-body flex flex-col justify-between">
				<h2 className="card-title">{Title}</h2>
				<div className="flex gap-x-2">
					<div className="badge badge-accent">{Year}</div>
					<div className="badge badge-secondary badge-outline">{imdbID}</div>
				</div>

				<div className="card-actions">
					<button
						className="btn btn-primary"
						onClick={() => {
							handleClick(imdbID);
							setShowWatchList(false);
						}}
					>
						More Details
					</button>
				</div>
			</div>
		</div>
	);
}

function MovieInfo({ imdbID, setMyWatchList, myWatchList, setShowWatchList }) {
	const [title, setTitle] = useState('');
	const [poster, setPoster] = useState('');
	const [genre, setGenre] = useState('');
	const [released, setReleased] = useState('');
	const [runtime, setRuntime] = useState('');
	const [rated, setRated] = useState('');
	const [plot, setPlot] = useState('');
	const [imdbRating, setImdbRating] = useState('');
	const [imdbVotes, setImdbVotes] = useState('');
	const [boxOffice, setBoxOffice] = useState('');
	const [awards, setAwards] = useState(null); // awards are optional in the api ⚠️
	const [isLoading, setIsLoading] = useState(false);
	const [movieData, setMovieData] = useState({});
	const [director, setDirector] = useState('');
	const [actors, setActors] = useState('');
	const [writer, setWriter] = useState('');

	useEffect(
		function () {
			const fetchMovieInfo = async () => {
				setIsLoading(true);
				let data = null;
				const response = await fetch(`${API}i=${imdbID}`);
				const {
					Title,
					Genre,
					Released,
					Runtime,
					Rated,
					Plot,
					Poster,
					imdbRating,
					imdbVotes,
					BoxOffice,
					Awards,
					Director,
					Writer,
					Actors,
				} = (data = await response.json());

				setTitle(Title);
				setPoster(Poster);
				setGenre(Genre);
				setReleased(Released);
				setRuntime(Runtime);
				setRated(Rated);
				setPlot(Plot);
				setImdbRating(imdbRating);
				setImdbVotes(imdbVotes);
				setBoxOffice(BoxOffice);
				setIsLoading(false);
				setAwards(Awards ?? null);
				setDirector(Director);
				setActors(Actors);
				setWriter(Writer);
				setMovieData(data);
			};

			fetchMovieInfo();
		},
		[imdbID]
	);

	return (
		<div className="card bg-base-100 shadow-xl flex w-full p-5">
			{isLoading ? (
				<div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
					Getting Movie Info...
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			) : (
				<>
					<button
						className="btn w-max btn-accent"
						onClick={() => setShowWatchList(true)}
					>
						⬅️ Show Watchlist
					</button>
					<figure>
						<img className="rounded-lg" src={poster} alt="Movie Poster" />
					</figure>
					<div className="card-body">
						<h2 className="card-title flex flex-col justify-start">
							<div className="badge badge-accent badge-outline text-lg">
								{title}
							</div>
							<button className="btn bg-success text-black hover:text-white">{`⚡Genre: ${genre}`}</button>

							<div className="flex flex-row space-x-3 mt-2">
								<div className="badge badge-info gap-2">{`📅Released: ${released}`}</div>
								<div className="badge badge-error gap-2">
									{`🕑Runtime: ${runtime}`}
								</div>
								<div className="badge badge-outline gap-2">{`⚠️Rated: ${rated}`}</div>
							</div>
							{awards && (
								<div className="text-sm mt-1">
									🎗️Awards : <span>{awards}</span>
								</div>
							)}

							<i className="text-xs font-light">
								🔥Starring {actors} | Director : {director} | Writer : {writer}
							</i>

							<div className="divider"></div>
						</h2>
						<div className="mx-auto justify-center w-min">
							<Stats
								imdbRating={imdbRating}
								imdbVotes={imdbVotes}
								boxOffice={boxOffice}
							/>
						</div>
						<div className="w-4/5 m-auto">
							<Ratings
								forMovie={movieData}
								setMyWatchList={setMyWatchList}
								myWatchList={myWatchList}
							/>
							{/* Add the rating component*/}
						</div>
						<div className="bg-base-100">
							<i className="text-sm font-light text-center">"{plot}"</i>
						</div>
						<div className="flex justify-center space-x-4">
							<div className="badge badge-primary badge-xs"></div>
							<div className="badge badge-primary badge-xs"></div>
							<div className="badge badge-primary badge-xs"></div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

function MovieTable({
	myWatchList,
	setMyWatchList,
	setImdbId,
	setShowWatchList,
}) {
	function handleDeleteMovie(id) {
		const yes = confirm('Are you sure you want to delete this movie?');
		if (!yes) return;
		const updatedMyWatchList = myWatchList.filter(({ imdbID }) => {
			return imdbID != id;
		});

		setMyWatchList(updatedMyWatchList);
	}

	return (
		<div className="overflow-x-auto mt-3">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th>Movie Title 🎬</th>
						<th>IMBD Rating ⭐</th>
						<th>Your Rating ⭐</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{myWatchList.map(
						({ Title, Poster, imdbRating, myRating, Runtime, imdbID }) => (
							<tr key={imdbID}>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img src={Poster} alt="Avatar Tailwind CSS Component" />
											</div>
										</div>
										<div>
											<div className="font-bold">{Title}</div>
											<div className="text-sm opacity-50">⌛{Runtime}</div>
										</div>
									</div>
								</td>
								<td>{imdbRating}</td>
								<td>{myRating}</td>
								<th>
									<button
										className="btn btn-ghost btn-xs"
										onClick={() => {
											setImdbId(imdbID);
											setShowWatchList(false);
										}}
									>
										Details
									</button>
								</th>
								<th>
									<button
										className="btn btn-error btn-xs"
										onClick={() => handleDeleteMovie(imdbID)}
									>
										Delete
									</button>
								</th>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}

function StatsForWatchList({ myWatchList }) {
	const [totalRuntime, setTotalRuntime] = useState(0);
	const [averageRating, setAverageRating] = useState(0);

	useEffect(
		function () {
			const totalRuntime = myWatchList.reduce((prev, { Runtime }) => {
				return prev + parseInt(Runtime);
			}, 0);

			setTotalRuntime((totalRuntime / 60).toFixed(2));
			if (myWatchList.length) {
				const avgRating =
					myWatchList.reduce((prev, { myRating }) => {
						return prev + myRating;
					}, 0) / myWatchList.length;
				setAverageRating(avgRating.toFixed(1));
			} else setAverageRating(0);
		},
		[myWatchList]
	);

	return (
		<div className="stats shadow flex justify-center">
			<div className="stat place-items-center">
				<div className="stat-title">Movies Watched</div>
				<div className="stat-value">{myWatchList.length}</div>
			</div>

			<div className="stat place-items-center">
				<div className="stat-title">Total Watchtime</div>
				<div className="stat-value text-secondary">{totalRuntime} hrs</div>
			</div>

			<div className="stat place-items-center">
				<div className="stat-title">Your Average Rating (/10)</div>
				<div className="stat-value">{averageRating}</div>
			</div>
		</div>
	);
}

function MovieWatchList({
	myWatchList,
	setMyWatchList,
	setShowWatchList,
	setImdbId,
}) {
	return (
		<div className="w-full h-full">
			<button
				className="btn btn-accent m-5"
				onClick={() => setShowWatchList(false)}
			>
				⬅️ Go Back to Info
			</button>
			<StatsForWatchList myWatchList={myWatchList} />
			{myWatchList.length ? (
				<MovieTable
					myWatchList={myWatchList}
					setMyWatchList={setMyWatchList}
					setImdbId={setImdbId}
					setShowWatchList={setShowWatchList}
				/>
			) : (
				<div className="alert alert-error mt-4 w-max mx-auto flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>Your Watchlist is empty 😞!</span>
				</div>
			)}
		</div>
	);
}

function App() {
	const [searchQuery, setSearchQuery] = useState('harry potter');
	const [imdbId, setImdbId] = useState('tt1201607');
	const [movies, setMovies] = useState([]);
	const [showWatchList, setShowWatchList] = useState(false);
	const [myWatchList, setMyWatchList] = useState(() => {
		const getMyWatchList = localStorage.getItem('myWatchList');
		return getMyWatchList ? JSON.parse(getMyWatchList) : [];
	});

	useEffect(() => {
		localStorage.setItem('myWatchList', JSON.stringify(myWatchList));
	}, [myWatchList]);

	return (
		<div className="antialiased">
			<NavBar
				Search={Search}
				onSearch={setSearchQuery}
				totalResults={movies.length}
			/>
			<ShowMovies>
				<MovieResults
					query={searchQuery}
					handleClick={setImdbId}
					movies={movies}
					setMovies={setMovies}
					setImdbId={setImdbId}
					setShowWatchList={setShowWatchList}
				/>
				{showWatchList ? (
					<MovieWatchList
						myWatchList={myWatchList}
						setMyWatchList={setMyWatchList}
						setShowWatchList={setShowWatchList}
						setImdbId={setImdbId}
					/>
				) : (
					<MovieInfo
						imdbID={imdbId}
						setMyWatchList={setMyWatchList}
						myWatchList={myWatchList}
						setShowWatchList={setShowWatchList}
					/>
				)}
			</ShowMovies>
		</div>
	);
}

export default App;

// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router } from "react-router-dom";
// import Header from "./components/header/Header";
// import Footer from "./components/layout/Footer";
// import CartProvider from "./components/store/CartProvider";
// import Routers from "./components/routers/Routers";
// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <Header></Header>
//         <Routers></Routers>
//         <Footer></Footer>
//       </CartProvider>
//     </Router>
//   );
// }
// export default App;

import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./components/movie/AddMovie";
import MoviesList from "./components/movie/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);


  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  function addMovieHandler(movie) {
    console.log(movie);
  }


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}
export default App;
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

import React, { useState } from "react";
import MoviesList from "./components/movie/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchMoviesHandler =  async () => {
    setIsloading(true);
    const response = await fetch("https://swapi.dev/api/films");
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
    setIsloading(false);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies!</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}
export default App;
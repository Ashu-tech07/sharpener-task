// <<<<<<<<<<<<<<<<<----------Ecommerce----------->>>>>>>>>>>>>>>>
import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/layout/Footer";
import CartProvider from "./components/store/CartProvider";
import Routers from "./components/routers/Routers";
import AuthProvider from "./components/store/AuthProvider";


function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
        <Header></Header>
        <Routers></Routers>
        <Footer></Footer>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}
export default App;


// <<<<<<<<<<<<<<-------------MoviesList----------->>>>>>>>>>>>>>>

// import React, { useState, useEffect, useCallback } from "react";
// import AddMovie from "./components/movie/AddMovie";
// import MoviesList from "./components/movie/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState(null);


//   const fetchMoviesHandler = useCallback(async () => {
//     setIsloading(true);
//     setError(null);
//     try {
//       const response = await fetch("https://sharpener-movies-default-rtdb.firebaseio.com/movies.json");
//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }
//       const data = await response.json();
//       const loadedMovies = [];
//       for (const key in data) {
//         loadedMovies.push({
//           id: key,
//           title: data[key].title,
//           openingText: data[key].openingText,
//           releaseDate: data[key].releaseDate,
//         });
//       }
//       setMovies(loadedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsloading(false);
//   }, []);

//   useEffect(() => {
//     fetchMoviesHandler();
//   }, [fetchMoviesHandler]);


//   async function addMovieHandler(movie) {
//     const response = await fetch(
//       "https://sharpener-movies-default-rtdb.firebaseio.com/movies.json",
//       {
//         method: "POST",
//         body: JSON.stringify(movie),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//   }


//   let content = <p>Found no movies.</p>;

//   if (movies.length > 0) {
//     content = <MoviesList movies={movies} />;
//   }

//   if (error) {
//     content = <p>{error}</p>;
//   }

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   }

//   return (
//     <>
//       <section>
//         <AddMovie onAddMovie={addMovieHandler} />
//       </section>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>{content}</section>
//     </>
//   );
// }
// export default App;


// <<<<<<<<<<<<<---------SignUp and Authentication-------->>>>>>>>>>>>>>>>>

// import { Routes, Route } from 'react-router-dom';
// import Layout from './components/layout/Layout';
// import UserProfile from './components/profile/UserProfile';

// import { BrowserRouter as Router } from 'react-router-dom';
// import AuthForm from './components/auth/AuthForm';
// import MainPage from './components/layout/MainPage';
// import { useContext } from 'react';
// import AuthContext from './components/store/auth-context';

// function App() {

//   const authCtx = useContext(AuthContext);

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path='/' element={<MainPage />} />
          
//           {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthForm />} />}

//           {authCtx.isLoggedIn && (
//             <Route path="/profile" element={<UserProfile />} />
//           )}
//           <Route path="*" element={<MainPage />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;


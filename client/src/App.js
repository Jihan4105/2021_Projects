// import React, {useState} from 'react'
// import Movie from './components/Movie'
// import MovieForm from './components/MovieForm'
// import Navbar from './components/Navbar'
// import Datepicker from './components/Datepicker'
// import Users from './pages/Users'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from 'react-router-dom';

// function App() {

//   const [movies, setMovies] = useState([]);

//   const removeMovie = (id) => {
//     setMovies(movies.filter(movie => {
//       return movie.id !== id;
//     }))
//   }

//   const renderMovies = movies.length ? movies.map(movie=> {
//     return (
//       <Movie movie={movie} key = { movie.id } removeMovie={removeMovie}/>
//     )
//   }) : '추가된 영화가 없습니다';

//   const addMovie = (movie) => {
//     setMovies([
//       ...movies, 
//       movie
//     ]);
//   }
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Switch>
//           <Route path = "/movies" exact>
//             <h1>Movie List</h1>
//             <MovieForm addMovie={addMovie}/>
//             {renderMovies}
//           </Route>
//           <Route path = "/users" exact>
//             <Users />
//           </Route>
//           <Route path = "/" exact>
//             <h1>Home</h1>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Routes from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            {Routes.map(route => {
              return (
              <Route key = {route.path} path = {route.path} exact>
                <route.component/>
              </Route>
              )
            })}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
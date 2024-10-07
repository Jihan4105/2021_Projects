import React, {useState, useEffect, useRef} from 'react';
import MovieForm from '../components/MovieForm';
import Movie from '../components/Movie';
import axios from 'axios';

const Movies = () => {
    const childRef = useRef();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/movies/list')
        .then(response => {
          if(JSON.stringify(movies) !== JSON.stringify(response.data.rows)) {
            setMovies(response.data.rows);
          } 
        });
    }, [movies]);

    const addMovie = (movie) => {
      axios.post('http://localhost:3001/movies/insert', movie)
        .then((response) => {
          setMovies([]);
        });
    }

    const updateMovieSet = (movie) => {
      childRef.current.resetForm(movie.id, movie.title, movie.year);
      document.getElementById('AddBtn').style.display = "none";
      document.getElementById('UpdateBtn').style.display = "inline-block";
      document.getElementById('CancelBtn').style.display = "inline-block";
  
    }
  
    const updateMovie = (movie) => {
      console.log(movie);
      axios.put('http://localhost:3001/movies/update', movie)
        .then((response) => {
          console.log("Updated");
          setMovies([]);
          childRef.current.initForm();
        });
  
    }

    const removeMovie = (id) => {
      axios.delete('http://localhost:3001/movies/delete', {
          data: {
            id: id
          }
        })
        .then((response) => {
          console.log("Deleted");
          setMovies([]);
        });
    }
    
    const renderMovies = movies.length ? movies.map(movie=> {
        return (
          <Movie movie={movie} key = { movie.id } updateMovieSet={updateMovieSet} removeMovie={removeMovie}/>
        )
    }) : '추가된 영화가 없습니다';

    return (
        <div>
            <h1>Movie List</h1>
            <MovieForm ref={childRef} addMovie={addMovie} updateMovie={updateMovie}/>
            {renderMovies}
        </div>
    );
};

export default Movies;
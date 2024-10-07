import React from 'react'

const Movie = ( {movie, updateMovieSet, removeMovie} ) => {

  return (
    <div className="movie">
    <div className="movie-title">
        {movie.title}
        <span className="movie-year">
            {movie.year}
        </span>
    </div>
    <button onClick={() => updateMovieSet(movie)}>수정</button>
    <button onClick={() => removeMovie(movie.id)}>삭제</button>
  </div>
  );
}

export default Movie;

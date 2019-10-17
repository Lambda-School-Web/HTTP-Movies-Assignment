import React from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const history = useHistory();
  const params = useParams();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => history.push("/"))
      .catch(err => console.error(err));
  };

  const renderButtons = () => {
    return (
      <>
        <button onClick={() => history.push(`/update-movie/${id}`)}>
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {params.id ? renderButtons() : null}
    </div>
  );
};

export default MovieCard;

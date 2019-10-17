import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  const [data, setData] = useState({});
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (params.id) {
      axios
        .put(`http://localhost:5000/api/movies/${params.id}`, data)
        .then(res => history.push(`/`))
        .catch(err => console.erro(err));
    } else {
      axios
        .post(`http://localhost:5000/api/movies/`, data)
        .then(res => history.push(`/`))
        .catch(err => console.erro(err));
    }
  };

  const handleChange = e => {
    e.persist();
    if (e.target.name === "stars") {
      setData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value.split(",")
      }));
    } else {
      setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={data.title}
          placeholder="Title"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="director"
          value={data.director}
          placeholder="Director"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="metascore"
          value={data.metascore}
          placeholder="Metascore"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="stars"
          value={data.stars}
          placeholder="Stars"
          onChange={e => handleChange(e)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();

  const API_KEY = "37c16878ac3ca0cac31a03e7f70e7c7a";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);
  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => setMovie(data));

  fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => setSimilar(data.results));
}, [id]);

  if (!movie) return <p className="text-white">Loading...</p>;
const getStars = (rating) => {
  const stars = Math.round(rating / 2);
  return "⭐".repeat(stars);
};
  return (
  <div className="bg-black text-white min-h-screen">
    <button
  onClick={() => navigate(-1)}
  className="absolute top-5 left-5 bg-black/70 px-3 py-1 rounded"
>
  ⬅ Back
</button>
    {/* Banner */}
    <div
      className="h-[80vh] bg-cover bg-center flex items-end p-5"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <h1 className="text-4xl font-bold bg-black/60 p-2 rounded">
        {movie.title}
      </h1>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col md:flex-row gap-6">
      
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="w-64 rounded-lg shadow-lg"
      />

      {/* Details */}
      <div>
        <h2 className="text-2xl font-semibold">{movie.title}</h2>

        <p className="text-gray-400 mt-2">
          {movie.overview}
        </p>

        <p className="text-yellow-400 text-xs">
  {getStars(movie.vote_average)}
</p>

        <p className="mt-2 text-sm text-gray-300">
          Release Date: {movie.release_date}
        </p>
      </div>
      
    </div>
    <div className="p-5">
  <h2 className="text-2xl font-bold mb-4">🎬 Similar Movies</h2>

  <div className="flex overflow-x-scroll gap-4 no-scrollbar">
    {similar.map((movie) => (
      <div
        key={movie.id}
        className="min-w-[150px] cursor-pointer hover:scale-110 transition"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          className="rounded-lg"
        />
      </div>
    ))}
  </div>
</div>
  </div>
);
}

export default MovieDetails;
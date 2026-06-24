import { useEffect, useState } from "react";
import { fetchTrending,fetchMovies, searchMovies, fetchByGenre } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toggleFavorite, isFavorite } from "../utils/favorite";

const genres = {
  Action: 28,
  Comedy: 35,
  Horror: 27,
  Romance: 10749,
};

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies().then(setMovies);
    fetchTrending().then(setTrending);
  }, []);

  const handleSearch = async (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value === "") {
    setIsFiltering(false);
    const data = await fetchMovies();
    setMovies(data);
  } else {
    setIsFiltering(true);
    const data = await searchMovies(value);
    setMovies(data);
  }
};
const getStars = (rating) => {
  const stars = Math.round(rating / 2);
  return "⭐".repeat(stars);
};
const getRecommended = () => {
  const recent = JSON.parse(localStorage.getItem("recent")) || [];
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];

  const combined = [...recent, ...favs];

  return combined
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);
};
  return (
    <div className="min-h-screen text-white p-5 bg-gradient-to-b from-black via-gray-900 to-black">
      
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleSearch}
        
        className="p-3 w-full mb-6 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />
      {isFiltering &&
      <button
  onClick={async () => {
    setIsFiltering(false);
    setQuery("");

    const data = await fetchMovies();
    setMovies(data);
  }}
  className="mb-4 mr-3 bg-gray-700 px-5 py-2 rounded-md hover:bg-gray-600 transition"
>
  🏠 Home
</button>
}

      {/* ❤️ Favorites Button */}
      <button
        onClick={() => navigate("/favorites")}
        className="mb-6 bg-red-600 px-5 py-2 rounded-md font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/40 transition"
      >
        ❤️ Favorites
      </button>
      <div className="flex gap-3 mb-6 flex-wrap">
  {Object.keys(genres).map((genre) => (
    <button
      key={genre}
     onClick={async () => {
  setLoading(true);
  setIsFiltering(true);

  const data = await fetchByGenre(genres[genre]);

  setTimeout(() => {
    setMovies(data);
    setLoading(false);
  }, 300);
}}
      className="bg-gray-800 px-4 py-2 rounded-full hover:bg-red-600 transition"
    >
      {genre}
    </button>
  ))}
</div>
      {!isFiltering && (
  <>
    <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>

    <div className="flex overflow-x-scroll gap-4 mb-8 no-scrollbar">
      {trending.map((movie) => (
        <div
          key={movie.id}
          className="min-w-[150px] cursor-pointer transform hover:scale-110 transition"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  </>
)}
<h2 className="text-2xl font-bold mb-4">🧠 Recommended For You</h2>

<div className="flex overflow-x-scroll gap-4 mb-8 no-scrollbar">
  {getRecommended().map((movie) => (
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
      {/* 🎬 Movies */}
      {loading ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="h-80 bg-gray-800 animate-pulse rounded-xl"
      ></div>
    ))}
  </div>
) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
  key={movie.id}
  onClick={() => navigate(`/movie/${movie.id}`)}
className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-110 hover:z-10 hover:shadow-red-500/30">
    
  
  {/* ❤️ Favorite */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      toggleFavorite(movie);
      setRefresh(!refresh);
    }}
    className="absolute top-2 right-2 z-10 text-lg bg-black/60 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
  >
    {isFavorite(movie.id) ? "❤️" : "🤍"}
  </button>

  {/* Poster */}
  {movie.poster_path && (
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      className="w-full h-80 object-cover"
    />
  )}

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
{/* 🎬 Hover Overlay */}
<div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
  
  <h3 className="text-sm font-bold">
    {movie.title}
  </h3>

  <p className="text-xs text-gray-300 line-clamp-3">
    {movie.overview}
  </p>

    <p className="text-yellow-400 text-xs">
  {getStars(movie.vote_average)}
</p>
  </div>
</div>
        ))}
      </div>
)}
      

    </div>
  );
}

export default Home;
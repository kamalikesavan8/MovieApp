import { getFavorites } from "../utils/favorite";

function Favorites() {
  const movies = getFavorites();

  return (
    <div className="bg-black min-h-screen text-white p-5">
      <h1 className="text-2xl mb-5">❤️ My Favorites</h1>

      {movies.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
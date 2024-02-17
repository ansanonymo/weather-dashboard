import { useContext, useEffect, useState } from "react";
import { FavoriteContext, WeatherContext } from "../../context";
import RedHeartIcon from "./../../assets/heart-red.svg";
import HeartIcon from "./../../assets/heart.svg";

export default function AddToFavourite() {
  const [isFavorite, toggleFavorite] = useState(false);
  const { addToFavorites, removeFromFavorites, favorites } =
    useContext(FavoriteContext);
  const { weatherData } = useContext(WeatherContext);

  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const found = favorites.find((fav) => fav.location === location);
    toggleFavorite(found);
  }, [location, favorites]);

  function handleFavorites() {
    const found = favorites.find((fav) => fav.location === location);

    if (!found) {
      addToFavorites(latitude, longitude, location);
    } else {
      removeFromFavorites(location);
    }
    toggleFavorite((isFav) => !isFav);
  }

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          className="cursor-pointer text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
          onClick={handleFavorites}
        >
          <span>Add to Favourite</span>
          <img src={isFavorite ? RedHeartIcon : HeartIcon} alt="heart" />
        </button>
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { LocationContext } from "../../context";
import { useDebounce } from "../../hooks";
import { getLocationByName } from "./../../data/location-data";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const { setSelectedLocation } = useContext(LocationContext);

  const doSearch = useDebounce((term) => {
    const fetchedLocation = getLocationByName(term);
    setSelectedLocation({ ...fetchedLocation });
  }, 500);

  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    doSearch(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
        <input
          className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
          type="search"
          placeholder="Search Location"
          value={searchTerm}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
}

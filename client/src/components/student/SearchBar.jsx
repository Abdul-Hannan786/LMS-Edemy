import { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/course-list/${input}`);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <img
        src={assets.search_icon}
        alt="search icon"
        className="md:w-auto w-10 px-3"
      />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80 placeholder:text-gray-500/80"
        name="search"
      />
      <button
        className="bg-blue-600 h-full rounded-r-md text-white md:px-10 px-7 font-semibold text-[16px]"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

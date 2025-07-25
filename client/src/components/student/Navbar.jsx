import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { navigate, isEducator, setIsEducator, getToken } = useAppContext();

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get("/api/educator/update-role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="md:flex hidden items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              {" "}
              <button className="cursor-pointer" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollments</Link>{" "}
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer font-semibold"
          >
            Sign in
          </button>
        )}
      </div>

      {/* For mobile view */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              {" "}
              <button className="cursor-pointer" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollments</Link>{" "}
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button className="cursor-pointer" onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="user icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

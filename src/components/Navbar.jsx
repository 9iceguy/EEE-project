import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center gap-3 rounded-2xl   py-1  backdrop-blur-sm">
      <Link
        className="rounded-full  px-4 py-2 text-sm font-semibold  transition hover:shadow-lg  hover:bg-blue-500"
        to="/help"
      >
        Help
      </Link>
      <Link
        className="rounded-full  px-4 py-2 text-sm font-semibold transition hover:shadow-2xl hover:bg-blue-500"
        to="/privacy"
      >
        Privacy
      </Link>
      <Link
        className="rounded-full  px-4 py-2 text-sm font-semibold transition hover:shadow-2xl hover:bg-blue-500"
        to="/about"
      >
        About
      </Link>
    </nav>
  );
};

export default Navbar;

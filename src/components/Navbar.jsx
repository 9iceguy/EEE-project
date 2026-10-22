import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="rounded-full border border-slate-300 p-2 text-slate-900 transition hover:border-blue-600 hover:text-blue-700 sm:hidden"
        aria-controls="main-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path d="m18 15-6-6-6 6" />
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={`${isOpen ? "flex" : "hidden"} mt-2 min-w-40 flex-col items-stretch gap-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-lg sm:mt-0 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-2 sm:border-0 sm:bg-transparent sm:p-1 sm:shadow-none sm:backdrop-blur-sm`}
      >
        <Link
          className="rounded-full px-3 py-2 text-xs font-semibold transition hover:bg-blue-500 hover:shadow-lg sm:px-4 sm:text-sm"
          to="/help"
          onClick={() => setIsOpen(false)}
        >
          Help
        </Link>
        <Link
          className="rounded-full px-3 py-2 text-xs font-semibold transition hover:bg-blue-500 hover:shadow-2xl sm:px-4 sm:text-sm"
          to="/privacy"
          onClick={() => setIsOpen(false)}
        >
          Privacy
        </Link>
        <Link
          className="rounded-full px-3 py-2 text-xs font-semibold transition hover:bg-blue-500 hover:shadow-2xl sm:px-4 sm:text-sm"
          to="/about"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          className="rounded-full px-3 py-2 text-xs font-semibold transition hover:bg-blue-500 hover:shadow-2xl sm:px-4 sm:text-sm"
          to="/attendance"
          onClick={() => setIsOpen(false)}
        >
          Attendance
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

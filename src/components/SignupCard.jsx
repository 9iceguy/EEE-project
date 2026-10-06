import {Link} from "react-router-dom";

const SignupCard = () => {
  return (
    <section className="bg-[#0b0b0b] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/30 bg-gradient-to-r from-blue-600/80 via-blue-700/70 to-black/80 p-8 shadow-2xl shadow-blue-900/30 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
              Access Portal
            </p>
            <h2 className="text-3xl font-black md:text-4xl">
              Create your secure account
            </h2>
            <p className="mt-4 text-base text-slate-200">
              Join the Electronic & Electrical Engineering filing system and manage
              biometric records with authorized access.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link to="/register">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
                Sign Up
              </button>
            </Link>
            <button className="rounded-full border border-white/30 bg-black/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/30">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupCard;
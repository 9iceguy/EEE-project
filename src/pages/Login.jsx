import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const loginForm = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        draggable: true,
      });
      return;
    }

    setPassword("");
    toast.info("Demo access only: authentication is not connected.", { position: "top-center" });
    navigate(`/portal/${role}/dashboard`);
  };

  return (
    <div className="min-h-[80vh] bg-[#0b0b0b] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Link to="/">
          <button className="mt-2 rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-950">
            Home
          </button>
        </Link>

        <div className="flex min-h-[70vh] items-center justify-center">
          <form
            onSubmit={loginForm}
            className="w-full max-w-md rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-950/80 via-black to-blue-900/60 p-6 shadow-xl shadow-blue-900/30"
          >
            <h1 className="mb-2 text-center text-3xl font-bold text-white">Login</h1>
            <p className="mb-5 text-center text-sm text-slate-400">Preview a role workspace. Authentication is not connected.</p>

            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="login-email" className="text-sm font-medium text-blue-100">Institutional email:</label>
              <input
                id="login-email"
                className="rounded-lg border border-gray-700 bg-white/10 p-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <label htmlFor="login-password" className="text-sm font-medium text-blue-100">Password:</label>
              <input
                id="login-password"
                className="rounded-lg border border-gray-700 bg-white/10 p-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label className="mb-6 flex flex-col gap-2 text-sm font-medium text-blue-100">
              Preview role:
              <select
                className="rounded-lg border border-gray-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="student">Student</option>
                <option value="staff">Staff / Lecturer</option>
                <option value="hod">Head of Department</option>
                <option value="adviser">Part Adviser</option>
              </select>
            </label>

            <button
              className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              type="submit"
            >
              Login
            </button>

            <p className="mt-6 text-center text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-300 hover:text-blue-200">
                Sign up
              </Link>
            </p>
            <Link to="/recover-password" className="mt-3 block text-center text-sm text-blue-300 hover:text-blue-200">
              Forgot password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

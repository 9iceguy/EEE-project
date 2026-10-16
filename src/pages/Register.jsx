import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sectionheader from "../components/Sectionheader";
import studentImage from "../assets/fast1193.webp";

const inputClass =
  "mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";

export default function Register() {
  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      toast.error("Passwords do not match.", { position: "top-center" });
      return;
    }

    toast.info(
      "Demo only: account registration is not connected to the department directory.",
      { position: "top-center" },
    );
  };

  return (
    <main className="bg-white text-slate-950">
      <section
        className="relative flex min-h-72 items-center justify-center bg-cover bg-center px-5 py-12 text-center text-white sm:min-h-80"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(5 13 18 / 82%), rgb(5 13 18 / 68%)), url("${studentImage}")`,
        }}
      >
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
            EEE OAU · Academic portal
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Create your account
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-200">
            Join in minutes. Get access to features that help you manage your
            academic journey.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="rounded-md border border-white/50 bg-black/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              Already have an account? Sign in
            </Link>
            <a
              href="#details"
              className="rounded-md bg-blue-700 px-5 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
            >
              Sign up
            </a>
          </div>
        </div>
      </section>

      <section id="details" className="px-5 py-9 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Sectionheader
              title="Your details"
              level={3}
              centered
              accent
            />
            <p className="mt-2 text-xs text-slate-600">
              We’ll use this information to create an account for you.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8">
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-slate-800" htmlFor="register-name">
                Full name
                <input
                  id="register-name"
                  name="fullName"
                  className={inputClass}
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                />
              </label>
              <label className="block text-xs font-semibold text-slate-800" htmlFor="register-email">
                Email address
                <input
                  id="register-email"
                  name="email"
                  className={inputClass}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block text-xs font-semibold text-slate-800" htmlFor="register-phone">
                Phone number
                <input
                  id="register-phone"
                  name="phone"
                  className={inputClass}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+234"
                  required
                />
              </label>
              <label className="block text-xs font-semibold text-slate-800" htmlFor="register-id">
                Matric / staff number
                <input
                  id="register-id"
                  name="institutionalId"
                  className={inputClass}
                  placeholder="EEE/2022/014"
                  required
                />
              </label>
              <label className="block text-xs font-semibold text-slate-800" htmlFor="register-password">
                Password
                <input
                  id="register-password"
                  name="password"
                  className={inputClass}
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  placeholder="Create a password"
                  required
                />
                <span className="mt-1 block font-normal text-slate-500">
                  Use at least 8 characters.
                </span>
              </label>
              <label className="block text-xs font-semibold text-slate-800" htmlFor="register-confirm-password">
                Confirm password
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  className={inputClass}
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  placeholder="Re-enter password"
                  required
                />
              </label>
              <label className="block text-xs font-semibold text-slate-800 sm:col-span-2" htmlFor="register-role">
                Account type
                <select
                  id="register-role"
                  name="accountType"
                  className={inputClass}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select your account type</option>
                  <option>Student</option>
                  <option>Staff / Lecturer</option>
                  <option>Part Adviser</option>
                  <option>Head of Department</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  toast.info("Demo only: Google sign-in is not connected.", {
                    position: "top-center",
                  })
                }
                className="rounded-md border border-slate-400 px-5 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Continue with Google
              </button>
              <button
                type="submit"
                className="rounded-md bg-black px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Create account
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Prototype only. Do not submit real passwords; this form does not
              create accounts.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

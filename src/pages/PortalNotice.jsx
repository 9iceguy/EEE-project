import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const notices = {
  "/session-expired": {
    title: "Your session has expired",
    message: "For your security, sign in again to continue. This prototype does not maintain authenticated sessions.",
    action: "Sign in",
    href: "/login",
  },
  "/access-denied": {
    title: "Access is restricted",
    message: "You may not have permission to view this area. Contact your department administrator if you believe this is an error.",
    action: "Return to portal",
    href: "/portal/student/dashboard",
  },
};

export default function PortalNotice() {
  const { pathname } = useLocation();
  const notice = notices[pathname];

  if (notice) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#080b12] px-4 py-12 text-white">
        <section className="w-full max-w-lg rounded-2xl border border-blue-400/20 bg-slate-950 p-8 text-center shadow-xl shadow-blue-950/30">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">EEE OAU portal</p>
          <h1 className="mt-4 text-3xl font-black">{notice.title}</h1>
          <p className="mt-4 text-sm leading-6 text-slate-400">{notice.message}</p>
          <Link to={notice.href} className="mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500">{notice.action}</Link>
        </section>
      </main>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    toast.info("Demo only: password recovery is not connected to an email service.", { position: "top-center" });
  };

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#080b12] px-4 py-12 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-blue-400/20 bg-slate-950 p-8 shadow-xl shadow-blue-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Account support</p>
        <h1 className="mt-3 text-3xl font-black">Reset your password</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Enter your institutional email to request a password reset link.</p>
        <label className="mt-6 block text-sm font-medium text-slate-300">Institutional email
          <input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30" type="email" autoComplete="email" required placeholder="name@example.edu"/>
        </label>
        <button className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500">Request reset link</button>
        <Link to="/login" className="mt-5 block text-center text-sm font-semibold text-blue-300 hover:text-blue-200">Back to login</Link>
        <p className="mt-5 text-center text-xs text-slate-600">Prototype only; no email will be sent.</p>
      </form>
    </main>
  );
}

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const submit = (event) => {
    event.preventDefault();
    toast.info("Demo only: account registration is not connected to the department directory.", { position: "top-center" });
  };

  return (
    <main className="min-h-[70vh] bg-[#080b12] px-4 py-12 text-white">
      <form onSubmit={submit} className="mx-auto max-w-2xl rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-950/70 via-slate-950 to-black p-6 shadow-xl shadow-blue-950/30 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">EEE OAU · Account access</p>
        <h1 className="mt-3 text-3xl font-black">Request portal access</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Use your official details. Access should be verified against departmental records before an account is activated.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-300">Full name *
            <input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30" autoComplete="name" required/>
          </label>
          <label className="text-sm font-medium text-slate-300">Institutional email *
            <input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30" type="email" autoComplete="email" required/>
          </label>
          <label className="text-sm font-medium text-slate-300">Matric / staff number *
            <input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30" required/>
          </label>
          <label className="text-sm font-medium text-slate-300">Requested account type *
            <select className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30" required defaultValue="">
              <option value="" disabled>Select role</option>
              <option>Student</option><option>Staff / Lecturer</option><option>Part Adviser</option><option>Head of Department</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-300 sm:col-span-2">Create password *
            <input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30" type="password" autoComplete="new-password" minLength="8" required/>
            <span className="mt-1 block text-xs font-normal text-slate-500">Use at least 8 characters. Do not reuse another account’s password.</span>
          </label>
        </div>
        <button className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Request access</button>
        <p className="mt-5 text-center text-sm text-slate-400">Already registered? <Link to="/login" className="font-semibold text-blue-300 hover:text-blue-200">Sign in</Link></p>
        <p className="mt-4 text-center text-xs text-slate-600">Prototype only. Do not submit real passwords; this form does not create accounts.</p>
      </form>
    </main>
  );
}

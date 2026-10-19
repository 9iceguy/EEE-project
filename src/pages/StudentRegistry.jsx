import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createStudent, listStudents } from "../api";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30";
const primaryButton =
  "inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60";
const secondaryButton =
  "inline-flex items-center justify-center rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white";

const initialForm = {
  identifier_type: "",
  identifier_value: "",
  full_name: "",
  phone_number: "",
  admission_year: "",
  mode_of_admission: "",
  current_level: "",
};

function responseRows(response) {
  return Array.isArray(response) ? response : response?.results ?? [];
}

function errorMessages(error) {
  const details = error?.details;
  if (!details || typeof details !== "object") return [];
  return Object.entries(details).flatMap(([field, value]) => {
    const messages = Array.isArray(value) ? value : [value];
    return messages
      .filter((message) => typeof message === "string")
      .map((message) => `${field === "non_field_errors" ? "" : `${field.replaceAll("_", " ")}: `}${message}`);
  });
}

function StudentRegistry({ mode = "directory", role }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const isRegistration = mode === "register";

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const loadStudents = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const response = await listStudents(
          { search: search.trim(), page: 1 },
          controller.signal,
        );
        if (isMounted) setStudents(responseRows(response));
      } catch (error) {
        if (isMounted && !controller.signal.aborted) {
          setLoadError(error.message || "Student records could not be loaded.");
          setStudents([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadStudents();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [refreshKey, search]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitStudent = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");
    setFieldErrors([]);
    try {
      await createStudent({
        ...form,
        admission_year: Number(form.admission_year),
        current_level: Number(form.current_level),
      });
      setForm(initialForm);
      setRefreshKey((current) => current + 1);
      toast.success("Student profile registered successfully.", { position: "top-center" });
    } catch (error) {
      setSubmitError(error.message || "The student could not be registered.");
      setFieldErrors(errorMessages(error));
    } finally {
      setSubmitting(false);
    }
  };

  const roleLabel = role === "adviser" ? "Part adviser" : "Staff";

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl border border-blue-300/20 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 p-6 shadow-2xl shadow-blue-950/20 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">{roleLabel} workspace</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isRegistration ? "Register a student" : "Student records"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              {isRegistration
                ? "Create a student profile using the official identifier and admission details."
                : "Search the student records available to your account and add a new profile when needed."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">
            <span className="size-2 rounded-full bg-emerald-400" />
            Connected to student records API
          </div>
        </div>
      </header>

      {isRegistration && (
        <section className="rounded-3xl border border-blue-400/20 bg-slate-950/90 p-5 shadow-xl shadow-blue-950/20 sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-xl text-blue-300" aria-hidden="true">＋</span>
            <div>
              <h2 className="text-lg font-bold text-white">Student biodata</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">Complete the required details. The API validates your access and assigned level.</p>
            </div>
          </div>

          <form onSubmit={submitStudent} className="space-y-7">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Identity</p>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-300">
                  Identifier type <span className="text-blue-300">*</span>
                  <select className={inputClass} name="identifier_type" value={form.identifier_type} onChange={updateField} required>
                    <option value="">Choose identifier type</option>
                    <option value="matriculation">Matriculation number</option>
                    <option value="utme">UTME number</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-300">
                  Identifier value <span className="text-blue-300">*</span>
                  <input className={inputClass} name="identifier_value" value={form.identifier_value} onChange={updateField} maxLength={100} required placeholder="e.g. EEE/2026/001" />
                </label>
                <label className="text-sm font-medium text-slate-300 md:col-span-2">
                  Full name <span className="text-blue-300">*</span>
                  <input className={inputClass} name="full_name" value={form.full_name} onChange={updateField} maxLength={200} required autoComplete="name" placeholder="Enter the student's full name" />
                </label>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Admission details</p>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <label className="text-sm font-medium text-slate-300">
                  Phone number <span className="text-blue-300">*</span>
                  <input className={inputClass} name="phone_number" value={form.phone_number} onChange={updateField} maxLength={30} required type="tel" autoComplete="tel" placeholder="Student contact number" />
                </label>
                <label className="text-sm font-medium text-slate-300">
                  Admission year <span className="text-blue-300">*</span>
                  <input className={inputClass} name="admission_year" value={form.admission_year} onChange={updateField} min="0" step="1" required type="number" inputMode="numeric" placeholder="e.g. 2026" />
                </label>
                <label className="text-sm font-medium text-slate-300">
                  Mode of admission <span className="text-blue-300">*</span>
                  <select className={inputClass} name="mode_of_admission" value={form.mode_of_admission} onChange={updateField} required>
                    <option value="">Choose admission mode</option>
                    <option value="utme">UTME</option>
                    <option value="direct_entry">Direct entry</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-300">
                  Current level <span className="text-blue-300">*</span>
                  <input className={inputClass} name="current_level" value={form.current_level} onChange={updateField} min="1" step="1" required type="number" inputMode="numeric" placeholder="e.g. 300" />
                </label>
              </div>
            </div>

            {submitError && (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">
                <p className="font-semibold">{submitError}</p>
                {fieldErrors.length > 0 && (
                  <ul className="mt-2 list-inside list-disc space-y-1 text-rose-100/90">
                    {fieldErrors.map((message, index) => <li key={`${message}-${index}`}>{message}</li>)}
                  </ul>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-xs leading-5 text-slate-500">
                This creates the student profile only. Student login accounts are provisioned separately by an authorised HOD.
              </p>
              <button className={primaryButton} type="submit" disabled={submitting}>
                {submitting ? "Registering..." : "Register student"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="rounded-3xl border border-blue-400/20 bg-slate-950/90 p-5 shadow-xl shadow-blue-950/20 sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{isRegistration ? "Recently registered students" : "Student directory"}</h2>
            <p className="mt-1 text-sm text-slate-400">Only records permitted for your signed-in account are returned.</p>
          </div>
          {isRegistration ? (
            <Link className={secondaryButton} to={`/portal/${role}/students`}>View student records</Link>
          ) : (
            <Link className={primaryButton} to={`/portal/${role}/register-student`}>＋ Register student</Link>
          )}
        </div>

        <label className="mb-5 block max-w-lg text-sm font-medium text-slate-300">
          Search by name or identifier
          <input className={inputClass} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Start typing a name or student number" />
        </label>

        {loadError && <p className="mb-4 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">{loadError}</p>}

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Identifier</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Admission year</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td className="px-4 py-8 text-center text-slate-400" colSpan="5">Loading student records...</td></tr>
              ) : students.length > 0 ? students.map((student, index) => (
                <tr key={student.student_id ?? student.id ?? `${student.identifier_value}-${index}`} className="text-slate-300 transition hover:bg-blue-400/[0.04]">
                  <td className="px-4 py-4 font-semibold text-white">{student.full_name || "Unnamed student"}</td>
                  <td className="px-4 py-4">{student.identifier_value || "—"}</td>
                  <td className="px-4 py-4">{student.current_level ?? "—"}</td>
                  <td className="px-4 py-4">{student.admission_year ?? "—"}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${student.is_active ? "bg-emerald-400/10 text-emerald-200" : "bg-slate-700 text-slate-300"}`}>
                      {student.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td className="px-4 py-8 text-center text-slate-400" colSpan="5">
                  {loadError ? "Student records are unavailable until the API request succeeds." : "No matching student records were found."}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StudentRegistry;

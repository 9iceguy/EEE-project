import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AttendanceDashboard.css";

const permissionKey = "eeeAttendanceApprovedStaff";
const sampleRecords = [
  { name: "Adebayo Olumide", staffId: "EEE/STAFF/021", department: "Power Systems", time: "08:04 AM", status: "Present" },
  { name: "Akinola Tobi", staffId: "EEE/STAFF/014", department: "Electronics", time: "08:12 AM", status: "Present" },
  { name: "Balogun Ife", staffId: "EEE/STAFF/032", department: "Telecommunications", time: "08:23 AM", status: "Late" },
  { name: "Oluwaseun Ade", staffId: "EEE/STAFF/008", department: "Control & Instrumentation", time: "08:31 AM", status: "Present" },
];

function readSession() {
  try {
    const rawSession = sessionStorage.getItem("eeePortalSession");
    if (!rawSession) return { session: null, error: "" };
    const session = JSON.parse(rawSession);
    if (!session || typeof session.email !== "string" || typeof session.role !== "string") {
      throw new Error("Invalid session data");
    }
    return { session, error: "" };
  } catch {
    return { session: null, error: "Your demo session could not be read. Please sign in again." };
  }
}

function readApprovedStaff() {
  const stored = localStorage.getItem(permissionKey);
  if (!stored) return [];
  const emails = JSON.parse(stored);
  if (!Array.isArray(emails) || emails.some((email) => typeof email !== "string")) {
    throw new Error("Invalid staff permission data");
  }
  return emails;
}

function Icon({ children }) {
  return <span className="attendance-icon" aria-hidden="true">{children}</span>;
}

function AttendanceDashboard() {
  const navigate = useNavigate();
  const [sessionState] = useState(readSession);
  const [permissionState, setPermissionState] = useState(() => {
    try {
      return { emails: readApprovedStaff(), error: "" };
    } catch {
      return { emails: [], error: "HOD staff permissions could not be read from this browser." };
    }
  });
  const [newEmail, setNewEmail] = useState("");
  const [search, setSearch] = useState("");
  const [showAccessManager, setShowAccessManager] = useState(false);

  const user = sessionState.session;
  const isHod = user?.role === "hod";
  const isAuthorizedStaff =
    user?.role === "staff" && permissionState.emails.includes(user.email.toLowerCase());
  const canViewDashboard = isHod || isAuthorizedStaff;

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sampleRecords;
    return sampleRecords.filter((record) =>
      [record.name, record.staffId, record.department, record.status]
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [search]);

  const updatePermissions = (emails) => {
    try {
      localStorage.setItem(permissionKey, JSON.stringify(emails));
      setPermissionState({ emails, error: "" });
      return true;
    } catch {
      setPermissionState((current) => ({
        ...current,
        error: "Could not save staff permissions in this browser. Check browser storage settings.",
      }));
      return false;
    }
  };

  const handleAuthorize = (event) => {
    event.preventDefault();
    const email = newEmail.trim().toLowerCase();
    if (!email) return;
    if (permissionState.emails.includes(email)) {
      toast.info("This staff member is already authorized.", { position: "top-center" });
      return;
    }
    if (updatePermissions([...permissionState.emails, email])) {
      setNewEmail("");
      toast.success("Staff attendance access authorized.", { position: "top-center" });
    }
  };

  const handleRevoke = (email) => {
    if (updatePermissions(permissionState.emails.filter((approvedEmail) => approvedEmail !== email))) {
      toast.success("Attendance access revoked.", { position: "top-center" });
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("eeePortalSession");
    navigate("/login");
  };

  if (sessionState.error) {
    return <AccessMessage title="Session unavailable" message={sessionState.error} />;
  }

  if (!user) {
    return (
      <AccessMessage
        title="Sign in to continue"
        message="The attendance dashboard is available only to HODs and staff approved by the Head of Department."
      />
    );
  }

  if (!canViewDashboard) {
    return (
      <AccessMessage
        title="Attendance access not approved"
        message="Your account does not have attendance permission yet. Ask your Head of Department to authorize your staff email."
        email={user.email}
      />
    );
  }

  return (
    <main className="attendance-app">
      <aside className="attendance-sidebar">
        <Link to="/" className="attendance-brand" aria-label="EEE OAU home">
          <span className="attendance-brand-mark">E</span>
          <span><strong>EEE OAU</strong><small>Attendance portal</small></span>
        </Link>

        <p className="attendance-nav-label">WORKSPACE</p>
        <nav className="attendance-nav" aria-label="Attendance navigation">
          <a href="#overview" className="active"><Icon>▦</Icon>Overview</a>
          <a href="#records"><Icon>▤</Icon>Attendance records</a>
          {isHod && (
            <button type="button" onClick={() => setShowAccessManager((open) => !open)}>
              <Icon>♙</Icon>Staff permissions
            </button>
          )}
        </nav>

        <div className="attendance-sidebar-bottom">
          <div className="sidebar-device">
            <span className="device-indicator" />
            <span><strong>ESP32 scanner</strong><small>Not connected</small></span>
          </div>
          <button className="sidebar-signout" type="button" onClick={handleSignOut}>
            <Icon>↪</Icon>Sign out
          </button>
        </div>
      </aside>

      <section className="attendance-main">
        <header className="attendance-topbar">
          <div className="breadcrumb">Workspace <span>/</span> Attendance</div>
          <div className="attendance-user">
            <span className="user-avatar">{isHod ? "H" : user.email.charAt(0).toUpperCase()}</span>
            <span><strong>{isHod ? "Head of Department" : "Authorized staff"}</strong><small>{user.email}</small></span>
          </div>
        </header>

        <div className="attendance-content" id="overview">
          <div className="attendance-heading">
            <div>
              <p className="attendance-eyebrow">ELECTRICAL & ELECTRONIC ENGINEERING</p>
              <h1>Attendance dashboard</h1>
              <p className="heading-description">Monitor staff check-ins recorded by the department fingerprint scanner.</p>
            </div>
            <button className="outline-action" type="button" onClick={() => toast.info("ESP32 connection is not configured yet.", { position: "top-center" })}>
              <Icon>⟳</Icon>Check device
            </button>
          </div>

          <div className="demo-notice" role="status">
            <Icon>ⓘ</Icon>
            <span><strong>Demo dashboard.</strong> Attendance below is sample data; live ESP32 synchronization is not connected.</span>
          </div>

          <section className="attendance-stats" aria-label="Attendance summary">
            <StatCard icon="♙" label="Staff on register" value="48" detail="Department staff" tone="blue" />
            <StatCard icon="✓" label="Checked in today" value="36" detail="75% of registered staff" tone="green" />
            <StatCard icon="◷" label="Late arrivals" value="04" detail="After 8:15 AM" tone="orange" />
            <StatCard icon="⌁" label="Scanner status" value="Offline" detail="Waiting for ESP32" tone="slate" />
          </section>

          <section className="scanner-panel">
            <div className="scanner-copy">
              <div className="scanner-title"><span className="scanner-wave">⌁</span><span><strong>Fingerprint scanner</strong><small>ESP32 · Department entrance</small></span></div>
              <p>Attendance is recorded when an enrolled staff member verifies their fingerprint on the connected scanner.</p>
              <div className="scanner-status"><span className="device-indicator" />Device disconnected</div>
            </div>
            <div className="fingerprint-art" aria-hidden="true">
              <span>◎</span><small>PLACE FINGER TO SCAN</small>
            </div>
            <div className="scanner-action">
              <span>Last sync <strong>Not available</strong></span>
              <button type="button" onClick={() => toast.info("Connect the ESP32 service to start a live fingerprint scan.", { position: "top-center" })}>
                Start verification
              </button>
            </div>
          </section>

          <section className="records-panel" id="records">
            <div className="records-heading">
              <div><h2>Recent attendance</h2><p>Sample check-ins for today · Monday, 12 October</p></div>
              <label className="attendance-search">
                <span aria-hidden="true">⌕</span>
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search staff..." aria-label="Search attendance records" />
              </label>
            </div>
            <div className="attendance-table-wrap">
              <table className="attendance-table">
                <thead><tr><th>Staff member</th><th>Department</th><th>Check-in</th><th>Status</th></tr></thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.staffId}>
                      <td><strong>{record.name}</strong><small>{record.staffId}</small></td>
                      <td>{record.department}</td>
                      <td>{record.time}</td>
                      <td><span className={`record-status ${record.status.toLowerCase()}`}>{record.status}</span></td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && <tr><td className="empty-records" colSpan="4">No sample records match your search.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          {isHod && showAccessManager && (
            <section className="access-panel" id="staff-access">
              <div className="records-heading">
                <div><h2>Staff attendance permissions</h2><p>Only emails approved here can open the staff attendance dashboard.</p></div>
                <span className="permission-count">{permissionState.emails.length} authorized</span>
              </div>
              {permissionState.error && <p className="permission-error" role="alert">{permissionState.error}</p>}
              <form className="authorize-form" onSubmit={handleAuthorize}>
                <label htmlFor="authorize-email">Staff email address</label>
                <div><input id="authorize-email" type="email" required value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="staff@oauife.edu.ng" /><button type="submit">Authorize staff</button></div>
              </form>
              {permissionState.emails.length ? (
                <ul className="authorized-list">
                  {permissionState.emails.map((email) => (
                    <li key={email}><span className="user-avatar">{email.charAt(0).toUpperCase()}</span><span>{email}</span><button type="button" onClick={() => handleRevoke(email)}>Revoke</button></li>
                  ))}
                </ul>
              ) : <p className="no-authorized-staff">No staff have been authorized yet. Add a staff email above to grant attendance access.</p>}
              <p className="permission-footnote">Demo only: permissions are saved in this browser and are not a secure server-side access control.</p>
            </section>
          )}

          <footer className="attendance-footer">EEE OAU · Staff attendance <span>Secure access managed by the Head of Department</span></footer>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value, detail, tone }) {
  return (
    <article className="attendance-stat">
      <span className={`stat-icon ${tone}`} aria-hidden="true">{icon}</span>
      <p>{label}</p><strong>{value}</strong><small>{detail}</small>
    </article>
  );
}

function AccessMessage({ title, message, email }) {
  const navigate = useNavigate();
  return (
    <main className="attendance-gate">
      <div className="gate-card">
        <span className="gate-mark" aria-hidden="true">E</span>
        <p className="attendance-eyebrow">EEE OAU · STAFF ATTENDANCE</p>
        <h1>{title}</h1>
        <p>{message}</p>
        {email && <div className="gate-email">{email}</div>}
        <div className="gate-actions">
          <Link to="/login" className="gate-primary">Sign in</Link>
          <button type="button" onClick={() => navigate("/")}>Back to home</button>
        </div>
        <small>HODs can sign in and authorize staff from the attendance dashboard.</small>
      </div>
    </main>
  );
}

export default AttendanceDashboard;

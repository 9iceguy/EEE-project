# Technical Report: OAU EEE Filing System

**Report date:** 19 October 2026  
**Project type:** Departmental academic portal and student-records interface  
**Reviewed implementation:** React/Vite frontend and its API documentation

## 1. Executive summary

The OAU EEE Filing System is a browser-based portal intended to support the
Department of Electronic and Electrical Engineering at Obafemi Awolowo
University. Its interface provides a public landing page, sign-in and
information pages, and role-oriented workspaces for students, staff, part
advisers, and the Head of Department (HOD). The most clearly implemented
operational workflow is staff/adviser student biodata registration and student
directory search through a backend API.

The frontend is built with React 19, React Router, Vite, and Tailwind CSS. It
uses a same-origin `/api/` client configured to proxy requests to a Django REST
Framework server. Session cookies and CSRF tokens are used for authentication
and state-changing requests. The frontend also contains API methods and
screens for other academic workflows, but the project documentation explicitly
identifies several portal areas as prototype-only or not yet integrated.

At the time of review, the supplied live page at
`/portal/staff/register-student` did not show the registration form. It
displayed a sign-in prompt with “The request failed (502),” and the browser
reported a failed upstream resource request. This indicates that the currently
configured API service or proxy was unavailable during this review; it does
not establish whether the application works when the backend is healthy.

## 2. Project purpose and scope

The site presents itself as an academic portal and filing system for the
department. Its intended goals include:

- Providing students and staff a branded point of entry to departmental
  services.
- Authenticating existing departmental accounts and routing users to
  role-specific workspaces.
- Supporting controlled creation and search of student biodata records.
- Providing a foundation for academic records, results, attendance,
  communication, and student-support workflows.

Account self-registration is intentionally not available. Users are directed
to contact a departmental administrator for accounts. Student profile
registration is separate from student account provisioning: registering
biodata does not itself create a login account.

## 3. System architecture

```text
Browser
  └─ React single-page application
      ├─ React Router routes and shared page layout
      ├─ Auth context (current user, sign-in, sign-out, session refresh)
      ├─ Role-based portal UI and student registry
      └─ API client: same-origin /api/ requests, JSON and CSV
           └─ Vite development proxy
                └─ Django REST Framework API (documented backend)
                     └─ Database and backend business rules
```

The frontend sends HTTP requests rather than accessing a database directly.
Authentication, authorization, validation, and record ownership are expected
to be enforced by the backend, not by the visibility of a frontend control.
The reviewed workspace contains the frontend application and API contract
documentation; backend source files and database configuration were not
present in the inspected project tree.

### Main frontend components

| Area | Responsibility |
| --- | --- |
| `src/App.jsx` | Defines application routes, shared providers, lazy-loaded portal route, and fallback navigation. |
| `src/Applayout.jsx` | Wraps most routes with shared header and footer; attendance is rendered outside that shell. |
| `src/auth/AuthContext.jsx` | Loads current identity, tracks auth state, and exposes sign-in/sign-out/session refresh operations. |
| `src/api.js` | Provides the shared API request layer, CSRF handling, error normalization, and named endpoint methods. |
| `src/pages/Portal.jsx` | Selects role-specific portal navigation and page content. |
| `src/pages/StudentRegistry.jsx` | Implements API-backed student search and biodata registration. |
| `src/pages/AttendanceDashboard.jsx` | Provides attendance UI and calls attendance/session endpoints, with sample display records as fallback. |
| `src/components/` | Shared navigation, header, footer, hero, and presentation components. |

## 4. Technology stack

| Layer | Technology |
| --- | --- |
| UI | React 19 and JSX |
| Routing | React Router DOM 7 |
| Build and development server | Vite 8 |
| Styling | Tailwind CSS 4 and component-specific CSS |
| Animation and carousel | Framer Motion and `react-responsive-carousel` |
| Notifications | React Toastify |
| HTTP | Browser `fetch()` through a shared JavaScript API client |
| Documented backend | Django REST Framework with session authentication |
| API formats | JSON for ordinary data; CSV for student-profile export |

The frontend package scripts include `dev`, `build`, `lint`, and `preview`.
The Vite development proxy defaults to `http://127.0.0.1:8000`; it can be
overridden with `VITE_API_PROXY_TARGET`.

## 5. User roles and principal workflows

### Public visitor

- Views the landing page, department information, help, privacy, and
  attendance entry point.
- Can proceed to sign-in.
- Is informed that portal accounts are issued by the department rather than
  through public self-registration.

### Student

The portal navigation describes dashboard, profile, courses and registration,
results, timetable, learning resources, requests, adviser, and notifications.
The API client includes methods for a student's own profile, results, GPA/CGPA,
and attendance. Several portal screens remain illustrative and should not be
treated as authoritative academic records unless they are explicitly connected
to the backend.

### Staff and part adviser

- Can access role-specific portal navigation.
- The student registry offers search by name or identifier and displays
  permitted records.
- Student registration captures identifier type/value, name, phone number,
  admission year, mode of admission, and current level.
- The UI explains that registration creates student biodata only. Student
  account creation is a separate HOD-authorized operation.

### HOD

The portal navigation describes department oversight, staff assignments,
course oversight, approvals, communications, reports, and decision history.
The API client exposes administrative methods in several related areas, but
screens for these workflows need to be checked individually for live backend
integration.

### Sign-in flow

The authentication context requests the current user on application startup.
Successful sign-in uses the returned role to navigate to a role-specific
dashboard. Staff with adviser-level assignments are directed to the adviser
workspace. Authentication errors are surfaced to the user; a 401/403 current
identity response is treated as an unauthenticated session.

## 6. Backend/API integration

The API reference describes REST endpoints grouped into:

- Authentication, current-user identity, logout, and account operations.
- Students, student accounts, profiles, and guardians.
- Adviser/HOD messaging.
- Results, GPA/CGPA, academic sessions, courses, offerings, and grading.
- Course requirements and graduation review.
- Attendance sessions, rosters, and attendance records.
- Guardian result-sharing preferences, preview, queue, and delivery batches.

The shared client uses `/api/` paths, preserves trailing slashes, sends
same-origin credentials, and adds an `X-CSRFToken` header to write requests.
It reports non-success responses as `ApiError` instances and supports
abortable reads and CSV blob responses.

The backend contract documents pagination at 20 records per page and defines
validation and authorization as backend responsibilities. It also cautions
that an accepted request or queued job does not necessarily mean that an
external delivery has completed.

**Important scope note:** the existence of a client method or API-documentation
entry is not proof that the corresponding backend is running or that a
particular UI flow is connected end-to-end. Backend source was not available in
the inspected workspace, so route implementation and database behavior could
not be independently verified.

## 7. Security and privacy considerations

Positive implementation choices documented or visible in the frontend:

- Session cookies are used instead of storing credentials or session tokens in
  local storage.
- CSRF tokens accompany state-changing operations.
- The frontend documentation states that backend permissions and business
  rules are authoritative.
- Login is limited to existing accounts; account issuance is departmental.
- Student registry copy indicates that returned records are scoped to the
  signed-in account.
- API errors can include backend validation details for users to correct.

Items that require deployment-level verification:

- Enforce HTTPS, secure/HttpOnly/SameSite cookie settings, CSRF origin checks,
  and appropriate CORS policy in the deployed backend.
- Confirm that every endpoint performs role and record-scope authorization;
  hiding routes or navigation is not an authorization control.
- Review retention, audit logging, export permissions, backup security, and
  access to personal student data.
- Ensure production UI does not present sample data as live institutional
  data.

## 8. Current status and known limitations

1. **Backend connectivity is currently failing in the shared browser.** The
   reviewed staff registration URL rendered a sign-in/access error after a
   502 request failure. Test again with the API and Vite proxy running.
2. **Backend implementation was not present in the inspected workspace.** The
   API reference is comprehensive, but backend routes, models, and deployment
   settings could not be checked directly.
3. **Some pages are prototypes.** The README warns that other portal pages may
   contain prototype data or actions. In `Portal.jsx`, demo forms explicitly
   state that they do not send data to a server.
4. **Attendance has illustrative fallback records.** The attendance page
   starts with sample records and can display them when API data is empty or
   a request fails. This should be clearly identified in all runtime states to
   avoid confusing samples with official attendance.
5. **The landing page and registration messaging should be aligned.** The
   landing call-to-action says “Create your account”/“Sign up,” while the
   registration page states that self-service account creation is unavailable.
6. **The UI includes broad navigation beyond the demonstrated integration.**
   Each route should be audited and labelled as live, unavailable, or
   illustrative until it is backed by verified server behavior.

## 9. Running and validating the frontend

From the `frontend` directory:

1. Start the Django API server at `http://127.0.0.1:8000`.
2. Install frontend dependencies with `npm install` if needed.
3. Run `npm run dev`.
4. Optionally set `VITE_API_PROXY_TARGET` in a local `.env` file when the
   backend runs at another address.
5. Validate with `npm run lint` and `npm run build`.

The API service must be available for sign-in and API-backed registration and
directory operations. A successfully rendered frontend alone does not verify
the backend integration.

## 10. Recommendations

1. Restore and verify the API/proxy connection, then exercise sign-in,
   student search, and student registration against a non-production test
   database.
2. Add integration tests covering authentication, CSRF, role access, student
   validation, error states, pagination, and registration/account separation.
3. Mark prototype pages and sample datasets consistently in the UI, and avoid
   success-shaped fallbacks that can be mistaken for saved records.
4. Align the public landing-page account call-to-action with the
   administrator-issued account policy.
5. Review every route against its documented endpoint and permission model
   before production release.
6. Complete a deployment review for transport security, session configuration,
   personal-data controls, backups, monitoring, and operational recovery.

## 11. Conclusion

The project provides a structured React frontend for a departmental academic
portal, with a comparatively mature API client contract and a concrete
student-record registration/directory workflow. Its production readiness
depends on restoring and validating backend connectivity, confirming that the
documented API behavior is implemented in the deployed server, and clearly
separating functional records workflows from prototype UI and sample data.

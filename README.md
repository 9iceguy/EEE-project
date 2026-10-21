# EEE OAU frontend
The web application to the departmental student filing system for the Electrical and Electronic Engineering project at Obafemi Awolowo University (OAU). It will organise student files and academic records, with a controlled interface to a separate student identity terminal.
React application built with Vite.

## Run locally

1. Start the Django API server on `http://127.0.0.1:8000`.
2. Install frontend dependencies with `npm install`.
3. Run `npm run dev` from this directory.

Vite forwards `/api` requests to the Django server. To use a different backend
address, set `VITE_API_PROXY_TARGET` in a local `.env` file, for example:

```dotenv
VITE_API_PROXY_TARGET=http://127.0.0.1:8001
```

The browser API client uses Django session cookies and CSRF tokens. It does not
store credentials or session tokens in local storage. Login requires an
existing backend account; there is no public self-registration endpoint.

The shared API methods and backend contracts are described in [api.md](./api.md).
Session authentication and the staff/part-adviser student directory and
registration screens use the documented API. Student registration creates
biodata only; a student login account is a separate HOD-authorized operation.
Other portal pages may still contain prototype data or actions and should not
be treated as live academic records.

## Checks

- `npm run lint`
- `npm run build`

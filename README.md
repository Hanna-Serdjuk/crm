# Dispatch — logistics workspace

A responsive Vue 3 frontend portfolio project for managing international shipments. Fictional data, original interface, working business interactions.

## Quick start

Requires Node.js 20.19+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

```sh
npm test          # unit and Pinia integration tests
npm run build    # production build to dist/
npm run preview  # serve the production build
```

A prebuilt `dist/` folder is included in the downloadable archive. It must be served over HTTP, not opened using a file:// URL.

## What to try

1. Open Overview and switch the reporting period.
2. Go to Shipments; search for Shanghai and filter by Ocean.
3. Sort by arrival date, change page size and export the filtered CSV.
4. Create a shipment. Submit the empty form first to inspect validation.
5. Open its detail dialog and change its status to Delivered.
6. Review the timeline and see updated totals in Analytics.
7. Reload the page: the shipment remains in the browser workspace.
8. Adjust profile details and table density in Settings.
9. Under Help & project info, preview the service error and retry.
10. Restore the sample dataset in Settings.

## Features

- Four routed views: Overview, Shipments, Analytics, Settings.
- Create, read, update and delete shipment records.
- Form validation, confirmation before deletion, status history.
- Combined text/status/mode filters and sortable, paginated table.
- Search and filters reflected in shareable URL query parameters.
- CSV export with quoting and leading-formula neutralization.
- Calculated metrics, monthly volume, status distribution, transport/customer breakdowns.
- Browser persistence with invalid-data recovery and storage-failure feedback.
- Loading skeleton, empty state and recoverable demo service failure.
- Responsive navigation, modal focus trap, Escape support, reduced motion.
- Sample route selector with custom SVG map (illustrative, not live tracking).

## Architecture

```text
src/
  components/      Reusable table, dialogs, forms, icons and map
  data/            Deterministic fictional dataset
  stores/          Pinia workspace state, CRUD and persistence
  utils/           Pure filtering, validation, metrics and CSV functions
  views/           Four route-level components
  App.vue          App shell and shared state feedback
  main.js          Vue, Pinia and hash router setup
  style.css        Responsive design system
 tests/            Domain and store integration tests
```

State belongs to Pinia; presentation-specific state stays in components. Domain functions are independent of Vue so they can be tested without a browser. Hash routing and relative asset paths let the app run on static hosts and GitHub Pages without rewrite rules.

## Intentional scope

This is a frontend demo, not a production logistics service. No backend, authentication, external carrier API, document upload, real-time tracking or multi-user sync is implemented. The short loading delay and optional error are explicit simulations. All data is stored under `dispatch-workspace-v1` in localStorage. Profile email is not used to send anything. Shipment value means declared goods value, not revenue. Seed records use August–October 2026; new records use the current date.

A real integration would replace the store's local load/save operations with an HTTP repository, introduce server validation/authentication, and add browser E2E tests. Browser visual QA was unavailable in the creation environment; the production build and automated domain/store tests were run.

## Deployment

Run `npm run build`, then host `dist/` on a static host. For GitHub Pages: upload this source to a repository, enable **Settings → Pages → Source: GitHub Actions**, and run the included **Deploy Pages** workflow. The workflow builds and deploys `dist/` and must be enabled in your own repository.

## Assessment research

See `ASSESSMENT-RESEARCH.md` for the reasoning behind the feature selection and examples of public take-home assignments. This is an original project, not a copied submission for one employer's assignment.

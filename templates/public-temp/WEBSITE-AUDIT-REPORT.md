# Unke Liye NGO Website Audit Report

Audit date: 19 August 2026

Scope: root HTML pages, shared CSS, and `js/main.js` / `js/forms.js`.

## Executive Summary

The project is a polished static front-end prototype with 19 HTML pages. Several navigation links point to pages that do not exist, and the main forms currently validate in the browser but do not send data to a server. Login, dashboards, rescue tracking, donation receipts, counters, and transparency figures are therefore demo experiences rather than production features.

## 1. Pages Not Created Yet

These filenames are referenced by existing pages but are missing from the workspace:

| Priority | Missing page | Why it is needed |
|---|---|---|
| High | `terms.html` | Linked from the footer, volunteer consent text, and transparency page. |
| High | `foster.html` | Linked from the Get Involved menu, footer, and donation confirmation. |
| High | `sponsor-animal.html` | Linked from the Get Involved menu and donation confirmation. |
| High | `work-environment.html` | Linked in the main navigation and footer. |
| High | `work-sanitation.html` | Linked in the main navigation and footer. |
| High | `work-disaster-relief.html` | Linked in the main navigation and footer. |
| High | `dashboard-volunteer.html` | Login redirects volunteer users here. |
| High | `dashboard-donor.html` | Login redirects donor users here. |
| Medium | `adopt-detail.html` | Adoption cards link to this page with animal IDs such as `?id=bajrang`. |
| Medium | `campaign-detail.html` | Campaign cards link to this detail view. |
| Medium | `events.html` | Needed for event listing and event discovery. |
| Medium | `event-detail.html` | Needed for individual event information and registration. |
| Medium | `gallery.html` | Needed for the gallery link/content workflow. |
| Medium | `news.html` | Needed for news listing. |
| Medium | `news-detail.html` | Needed for individual news articles. |
| Medium | `story-detail.html` | Needed for individual impact stories. |

There are 16 missing linked pages in total. Query strings such as `adopt-detail.html?id=bruno` are variants of the same missing detail page, not separate files.

## 2. Features Still Needed

### Critical for a real launch

- **Backend form handling:** Connect contact, volunteer, animal report, newsletter, and donation forms to secure server/API endpoints. Current forms use `preventDefault()` and demo callbacks, so submissions are not persisted.
- **Razorpay payment integration:** Add order creation, checkout, signature verification, webhook handling, failure/retry states, and server-generated receipts. `donate.html` mentions Razorpay but does not load or call its SDK.
- **Real authentication:** Replace the demo login in `login.html` with account creation, password hashing, sessions/tokens, logout, password reset, and role-based access.
- **Rescue operations system:** Store reports, assign teams, update statuses, notify reporters, and expose only authorized case information. `dashboard-rescue-status.html` currently shows hard-coded case data.
- **Admin/staff dashboard:** Manage rescue cases, volunteers, donors, campaigns, animals, content, documents, and incoming form submissions.
- **File upload storage and security:** Validate file type and size on the server, scan uploads, store them securely, and restrict access to rescue photos.
- **Email/SMS/WhatsApp notifications:** Send report reference numbers, status updates, donation receipts, volunteer replies, and adoption follow-ups.

### Important operational features

- Adoption application workflow with screening, appointment scheduling, approval status, and follow-up.
- Foster and animal sponsorship workflows with recurring payment support.
- Campaign and event registration, attendance tracking, and reminders.
- Donation history, downloadable receipts, 80G certificate delivery, and donor preferences.
- Search/filter/sort for animals, stories, campaigns, events, and news.
- CMS or data source for impact numbers, campaigns, stories, and transparency reports so figures are not hard-coded in HTML.
- Consent records, newsletter unsubscribe, data export/deletion requests, and an actual cookie-consent choice if analytics are added.
- Monitoring, error logging, backups, spam protection, rate limiting, and audit logs.

## 3. Improvements Recommended

### Navigation and content

- Remove or temporarily disable links to missing pages until those pages are created; broken links currently appear in shared navigation and footers.
- Replace dropdown anchors using `href="#"` with accessible buttons that open menus and work by keyboard.
- Keep navigation and footer content consistent. Different pages expose different mobile menu links and emergency phone numbers.
- Replace placeholder/demo data, including the 2024 copyright, sample registration number, sample rescue case, sample receipt, and unverified impact statistics with approved organization data.
- Add a clear service-area statement and verify all phone numbers, addresses, email addresses, response-time claims, and tax/80G claims before publication.

### Forms and user feedback

- Add success, error, loading, duplicate-submit, and offline states to every form.
- Preserve entered form data when validation fails and show errors next to the correct field with reliable `aria-describedby` relationships.
- Add server-side validation for every client-side rule. Client-side validation alone is not security.
- Add consent wording and links for contact, rescue, volunteer, adoption, and marketing data collection.
- Add CAPTCHA or equivalent abuse protection to public forms, especially the rescue report and newsletter forms.
- Make the photo upload show file limits, upload progress, remove controls, and a clear failure state.

### Accessibility

- Audit all pages with keyboard navigation and a screen reader. Ensure focus is visible and focus is returned correctly after dialogs/menus close.
- Complete the mobile navigation focus trap; `main.js` focuses the first item but does not implement Tab cycling within the drawer.
- Add proper tab relationships (`aria-controls`, unique panel IDs, and keyboard arrow behavior) to the login tabs.
- Give progress bars, counters, status steps, and live updates meaningful accessible names and live-region behavior where appropriate.
- Avoid relying on emoji as the only meaning for urgency, rescue status, or actions.
- Check color contrast, reduced-motion behavior, heading order, alt text, and form error announcements across all pages.

### SEO, performance, and production readiness

- Add unique descriptions, canonical URLs, Open Graph/Twitter metadata, structured data, and a real XML sitemap.
- Optimize and self-host critical fonts/assets where possible; add image dimensions, modern image formats, lazy loading, and compression.
- Add a Content Security Policy, HTTPS, security headers, dependency/update policy, and a deployment configuration.
- Test all pages at mobile, tablet, and desktop widths. Long detail values in the rescue dashboard and multi-column forms need extra responsive testing.
- Add automated link checking, HTML validation, accessibility checks, and end-to-end tests for donation, rescue reporting, login, and volunteer submission.

## 4. Current Functionality

Already present in the prototype:

- Static informational pages for home, about, adoption listing, campaigns, contact, FAQ, impact, stories, transparency, volunteering, donation, rescue reporting, privacy, sitemap, and 404.
- Shared scroll reveal animations, number counters, progress bars, accordions, tabs, carousel behavior, modals, toast notifications, sticky header, and mobile navigation in `js/main.js`.
- Shared client-side validation and image preview helpers in `js/forms.js`.
- Donation URL parameters update the confirmation display, but this is not proof of a completed payment.

## 5. Suggested Delivery Order

1. Fix or remove all broken links and create `terms.html`.
2. Build a secure backend for contact, volunteer, newsletter, rescue reports, and file uploads.
3. Integrate and verify Razorpay payments and receipts.
4. Build rescue/admin dashboards and real status notifications.
5. Create adoption, foster, sponsorship, campaign, work, event, news, gallery, and story detail pages.
6. Replace demo content with verified data and complete accessibility, SEO, security, and automated testing.

## Audit Notes

- This report is based on static source inspection; no server or external payment/service credentials were available to test.
- The absence of a page means its HTML file is not present in the workspace, even where other pages already link to it.
- The existing front end can be used as the visual baseline while the data and operational layers are implemented.
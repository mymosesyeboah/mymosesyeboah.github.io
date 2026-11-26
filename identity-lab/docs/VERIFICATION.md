# Verification and limitations

## Automated checks

Executed 26 November 2026 from identity-labhr using npm test:
41 tests, 41 passed, 0 failed, 0 skipped.

Coverage includes:

- Provisioning, one-time password return without persistence, duplicate prevention and uncertain creation outcomes.
- Role-assignment retries and reconciliation after lost responses.
- HR authorization, CSRF checks and HTML escaping.
- Transfer ordering, stale submissions, restart recovery and denial of old application sessions.
- Corrupt or missing local policy handling and stable identity matching.
- Deactivation, session-revocation requests, managed-role cleanup, throttling, partial failures and retry checkpoints.
- Prevention of ordinary onboarding or transfer actions reactivating an inactive employee.

These tests use synthetic files and fake Microsoft Graph calls. Passing them does not prove live tenant configuration, browser security, MFA enforcement or production readiness.

## User-reported live checks

| Scenario | Reported observation |
| --- | --- |
| OIDC sign-in | Finance and Sales dashboards opened for an assigned user |
| Missing department role | Signed-in user denied access |
| SAML sign-in | Marketing worked for an assigned user |
| Cross-protocol SSO | Marketing sign-in did not request another password after Entra sign-in |
| HR onboarding | Temporary password appeared and employee could access Finance |
| Department isolation | New Finance employee denied Sales and unassigned Marketing |
| Department transfer | Workflow worked; previous Finance access denied |
| Employee deactivation | Existing Sales access denied after deactivation |

These are observations supplied by the learner during the build. No screenshots, recording or independent live tenant audit are included.

## Important boundaries

- Entra sign-in sessions and application cookies are separate. Local logout is not universal logout.
- Local policy denies access on the next protected server request; it cannot recall displayed or downloaded content.
- A successful Graph session-revocation request is not proof that every issued token or third-party session instantly stopped working.
- Manually created users outside HR remain subject to app roles but are not governed by this HR lifecycle.
- Cleanup manages configured direct department-role assignments, not all groups or unrelated permissions.
- JSON persistence and in-memory sessions are intended for a same-computer, single-process lab.
- Work executes during requests, not in a durable background queue. Manual directory changes are not continuously reconciled.
- Production HTTPS across all apps, durable sessions, secret management, operational monitoring and recovery require further work.
- MFA and Conditional Access enforcement have not yet been demonstrated as a controlled test.

## Evidence to capture in a future recording

Show the assigned role and permitted dashboard, an unassigned department denial, a transfer with the old dashboard denied, and an inactive employee with access denied. Mask tenant identifiers and account details as appropriate; never record secrets or temporary passwords.


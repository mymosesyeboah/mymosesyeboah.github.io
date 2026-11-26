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

The lifecycle screenshots linked below corroborate visible outcomes from a later exercise using Michael Larbi. SAML and cross-protocol SSO remain reported observations. No recording or independent live tenant audit is included.

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

## Screenshot evidence

Captured on 26 November 2026 using fictional employee Michael Larbi. Original screenshots are retained without image edits.

### Joiner

- [HR reports the employee is ready](../assets/evidence/01-hr-onboarding.png): The HR application reports that Michael's account and Finance.User access are ready.
- [The account exists in Entra](../assets/evidence/02-entra-account-enabled.png): Michael's user overview shows an enabled account and one application assignment.
- [Finance access is directly assigned](../assets/evidence/03-finance-role-assignment.png): Entra lists Learning Lab - Finance with the Finance User role directly assigned to Michael.
- [Finance opens for Michael](../assets/evidence/04-finance-allowed.png): The Finance dashboard displays Michael's name and the Finance User badge.
- [Sales denies access](../assets/evidence/05-sales-denied-before-transfer.png): The Sales dashboard denies the request because the current HR record does not permit Sales. This is an HR policy denial, not a screenshot of a missing-role error.

### Mover

- [HR confirms the transfer](../assets/evidence/06-hr-transfer.png): HR reports that Michael moved from Finance to Sales and must sign in again to use the new access.
- [The previous Finance dashboard is denied](../assets/evidence/07-finance-denied-after-transfer.png): Refreshing the existing Finance tab returns an HR policy denial. The previous session does not override the changed department.
- [Sales opens after a new sign-in](../assets/evidence/08-sales-allowed.png): The Sales dashboard displays Michael's name and the Sales User badge.

### Leaver

- [HR confirms deactivation](../assets/evidence/09-hr-deactivation.png): HR reports account disabling, managed department-access removal and a session-revocation request. The employee record is retained.
- [The existing Sales session is denied](../assets/evidence/10-sales-denied-after-deactivation.png): Sales rejects the protected request because the employee is inactive or being deactivated. The local HR policy enforces this application block.
- [Entra confirms the account is disabled](../assets/evidence/11-entra-account-disabled.png): Michael's account status is Disabled. The overview still shows two applications and one group membership, so this image does not establish that all assignments were removed.

These captures document visible application and directory outcomes. The denial pages do not display the employee identity, so they are interpreted as part of the recorded exercise sequence, not standalone identity evidence. SSO and SAML remain separately reported lab checks without recording evidence. Account disabling does not prove removal of every application assignment or group membership.

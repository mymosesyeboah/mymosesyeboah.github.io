# Seven-minute portfolio demonstration

## Preparation

Start all four applications. Use separate administrator and employee browser profiles. Have a manually assigned test user ready for the three-app SSO demonstration and a fresh fictional HR employee username beginning with lab. for the lifecycle demonstration.

Use a new unique username rather than repeating a previously deactivated account. Finance and Sales must be configured in HR. Marketing can be demonstrated independently if its HR mapping is not configured.

Allow extra time for first-login registration, password changes and directory propagation. Complete password entry off-camera. Never show environment files, secrets or temporary passwords.

## 0:00–1:00 ,  Explain the problem

“Employees need access appropriate to their job. I built an HR-driven identity lab that creates accounts, assigns department access, changes access when employees move and removes managed access when they leave.”

Show the architecture in README.md. Explain that Entra handles identity, each app enforces authorization, and HR calls Graph using a separate application identity.

## 1:00–2:00 ,  Demonstrate SSO

Sign into Finance as the manually assigned test user, then open Sales and Marketing.

“Finance and Sales use OIDC; Marketing uses SAML. Each application establishes its own session through Entra. An existing Entra session can avoid another password prompt.”

If the tenant requests another authentication step, show it honestly. Explain that SSO behavior depends on session and policy conditions.

## 2:00–3:30 ,  Demonstrate joining and least privilege

As the HR administrator, create a fictional Finance employee. Keep the password off-camera. Complete the employee's first sign-in in the separate browser profile.

Show Finance access and Sales denial.

“Authentication establishes identity. Authorization determines which application this employee can use.”

## 3:30–5:00 ,  Demonstrate a department move

Keep the employee's Finance dashboard open. In HR transfer the employee to Sales and wait for completion.

Refresh Finance to show denial, then begin a fresh Sales sign-in and show permitted access.

“The workflow removes the old managed role before granting the new one. Our apps also check current HR policy, so an old local session cannot preserve previous department access.”

## 5:00–6:00 ,  Demonstrate leaving

Keep Sales open. In HR deactivate the employee with a fictional reason and wait for completion. Refresh Sales to show denial.

“HR persists the access block first, disables the directory account, requests session revocation and removes managed roles. It retains the employee and history for review.”

Do not claim that Entra revocation alone caused immediate denial: the local HR policy check enforces this application's block.

## 6:00–7:00 ,  Explain reliability and limitations

Show the automated test result and lifecycle history.

“The suite includes retries, interrupted operations and lost responses. All 41 tests passed using fake Graph calls. I also tested the user journeys in my lab tenant. This is a local learning implementation; MFA policy testing, production hosting and operational hardening are separate next steps.”

## Practice questions

1. Why does SSO not automatically grant access to every app?
2. How does an ID token differ in purpose from the Graph access token?
3. Why does HR use a separate provisioning identity?
4. Why check local policy when the application already has a session?
5. What happens if a transfer or deactivation fails halfway through?
6. Which observations prove authorization, and which would be needed to prove MFA enforcement?


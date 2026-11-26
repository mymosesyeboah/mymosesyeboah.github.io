# Local setup and operation

This guide describes the existing implementation. Use a disposable lab tenant and fictional employees. It is not a turnkey source distribution.

## Folder layout

Keep these folders together: identity-labfinance, identity-labsales, identity-labmarketing, identity-labhr and identity-labshared. The shared policy reads HR's local employee store. Run one HR process.

Use a supported Node.js version compatible with the package lock files. Install dependencies with npm ci in each of the four application folders.

## Sign-in configuration

| Application | Protocol | Callback / reply URL | Required role |
| --- | --- | --- | --- |
| Finance | OIDC | http://localhost:3000/auth/callback | Finance.User |
| Sales | OIDC | http://localhost:3001/auth/callback | Sales.User |
| HR | OIDC | http://localhost:3003/auth/callback | HR.Admin |
| Marketing | SAML | https://localhost:3002/auth/saml/callback | Marketing.User |

Use separate Entra application registrations for Finance, Sales and HR. Configure their callbacks as Web redirects. Define the corresponding user app roles and assign test users through the enterprise applications.

Marketing uses an enterprise SAML application with entity ID urn:identity-lab:marketing. Configure the reply URL above, signed assertions, the role claim and the Entra object-identifier claim. Require assignment. The app validates signed assertions using the downloaded tenant application signing certificate.

Marketing also needs its local HTTPS certificate and private key under certs. The HTTPS certificate and Entra assertion-signing certificate serve different purposes. Follow the existing server.js file names. Establish local certificate trust only for your own generated localhost certificate.

## Environment settings

Finance and Sales each need TENANT_ID, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI and a distinct SESSION_SECRET in their own .env file.

Marketing needs TENANT_ID, SESSION_SECRET, SAML_ENTITY_ID and SAML_CALLBACK_URL.

HR needs TENANT_ID, HR_CLIENT_ID, HR_CLIENT_SECRET, PROVISIONING_CLIENT_ID, PROVISIONING_CLIENT_SECRET, REDIRECT_URI, SESSION_SECRET, EMPLOYEE_DOMAIN, FINANCE_APP_ID and SALES_APP_ID. MARKETING_APP_ID is optional for HR-managed Marketing provisioning. Use application/client IDs for these department settings, not enterprise application object IDs.

The HR sign-in registration and provisioning registration must be different. Provisioning credentials stay on the HR backend. Use a verified tenant domain for EMPLOYEE_DOMAIN.

## Provisioning permissions used by this lab

The separate provisioning application uses Microsoft Graph application permissions with administrator consent:

- User.Create
- Application.Read.All
- AppRoleAssignment.ReadWrite.All
- User.ReadUpdate.All
- User.EnableDisableAccount.All
- User.Read.All
- User.RevokeSessions.All

This list records the implemented lab configuration, not a claim that it is the minimum possible permission set. These are powerful tenant-wide permissions; department restrictions in application code do not reduce the credential's directory-level authority.

## Start and verify

Open a terminal in each application folder and run node server.js. Visit the four localhost addresses in the table, without the callback path. Use separate browser profiles for the administrator and employee.

From identity-labhr run npm test to execute the automated suite. These tests do not require live Graph mutations.

Create only fictional employee accounts with the required lab. username prefix. Copy the temporary password when displayed; HR does not persist it. Sign in as the employee and complete password change and any tenant-required registration.

Keep the existing Security Defaults configuration while the separate Conditional Access lesson remains pending.

## Sharing

Do not upload .env files, node_modules, data, backups, session material, private keys or screenshots containing temporary passwords. Prepare placeholder environment examples before publishing source. This package publishes nothing and changes no tenant settings.


# Entra Identity Lifecycle Lab

A practical identity and access management portfolio project: an HR application provisions test employees into Microsoft Entra ID, grants department access, transfers employees and disables access when they leave.

## What the project demonstrates

- OIDC sign-in for Finance, Sales and HR.
- SAML sign-in for Marketing, with Entra providing SSO across protocols.
- Independent application sessions and role-based authorization: authentication alone does not grant department access.
- OAuth 2.0 client credentials for backend Microsoft Graph operations.
- Joiner, mover and leaver workflows with persisted checkpoints, retry handling and lifecycle history.
- Application-side access checks that deny HR-managed employees on their next protected request after a transfer or deactivation.

## Architecture

~~~mermaid
flowchart LR
  subgraph client["Browser"]
    employee["Employee"]
    admin["HR administrator"]
  end
  subgraph service["Local Node.js applications"]
    finance["Finance :3000"]
    sales["Sales :3001"]
    marketing["Marketing HTTPS :3002"]
    hr["HR :3003"]
  end
  subgraph datastore["Local persistence"]
    records["HR employee JSON"]
  end
  subgraph external["Microsoft cloud"]
    entra["Entra ID"]
    graphApi["Microsoft Graph"]
  end
  employee --> finance
  employee --> sales
  employee --> marketing
  admin --> hr
  finance -.->|"OIDC"| entra
  sales -.->|"OIDC"| entra
  marketing -.->|"SAML"| entra
  hr -.->|"OIDC administrator sign-in and app token acquisition"| entra
  hr -.->|"Application token: provision and manage access"| graphApi
  hr -->|"Persist lifecycle and policy"| records
  finance -->|"Check HR policy"| records
  sales -->|"Check HR policy"| records
  marketing -->|"Check HR policy"| records
~~~

Authentication arrows summarize browser redirects and server exchanges; they are not a packet-level sequence diagram. Microsoft Graph manages users and application assignments in the same Entra tenant.

Each department app first validates its sign-in response and creates its own session. Its protected dashboard also requires its application role. For HR-managed employees, the shared policy checks employee status, department and access version against the HR store using the Entra object ID.

## Lifecycle behavior

| Event | Directory changes | Local enforcement |
| --- | --- | --- |
| Join | Create employee; assign department role | Employee becomes active after confirmation |
| Move | Remove source role; assign destination role; update department | Block during transition; invalidate old policy versions |
| Leave | Disable account; request session revocation; remove managed direct roles | Persist access block before remote operations; retain history |

## Evidence

On 26 November 2026, all **41 automated tests passed**, with zero failures or skipped tests. These use fake Graph responses and synthetic records; they do not constitute a live Entra integration test.

The learner separately reported successful OIDC and SAML sign-ins, cross-application SSO, department access denials, provisioning, transfer enforcement and denial of an existing Sales session after deactivation. See [Verification](VERIFICATION.md) for evidence boundaries.

## Read next

- [Local setup and operation](SETUP.md)
- [Seven-minute demonstration](DEMO.md)
- [Verification and limitations](VERIFICATION.md)

## Scope

This is a learning lab, not a production identity platform. Enhanced MFA and Conditional Access exercises are deferred. SSO without another password prompt does not prove that MFA was required for that request. No claim of complete Zero Trust implementation is made.

This documentation package contains no runtime employee records, secrets, certificates or application source. The existing source remains in the sibling application folders.


# Releasing Strawn

Strawn publishes only from the protected `npm-release` GitHub environment after
the repository quality workflow succeeds on `main`.

## First release bootstrap

The npm packages must exist before npm can attach trusted publishers to them.
Use a token only for this one bootstrap publish:

1. Enable two-factor authentication for the maintainer account.
2. Create a new, short-lived granular npm token with read/write access to all
   packages and 2FA bypass enabled. This is required only because the two
   unscoped package names do not exist yet.
3. Create the `npm-release` GitHub environment, add required reviewers, and add
   the token as the environment secret `NPM_BOOTSTRAP_TOKEN`.
4. Merge the reviewed Changesets release pull request. The release workflow
   publishes only package versions that are absent from npm.
5. Configure a trusted publisher in both npm packages with these exact values:
   - Provider: GitHub Actions
   - Organization: `moriatz-labs`
   - Repository: `strawn`
   - Workflow: `release.yml`
   - Environment: `npm-release`
   - Allowed action: `npm publish`
6. Delete `NPM_BOOTSTRAP_TOKEN` from GitHub and revoke the bootstrap token on
   npm. Then set each package's publishing access to require 2FA and disallow
   traditional tokens.

Never reuse, rotate, or refresh the bootstrap token. Trusted publishing issues
short-lived OIDC credentials for each approved workflow run, so regular releases
have no npm publishing secret to maintain.

## Regular release

1. Add a Changeset with the implementation pull request.
2. Merge only after all required quality jobs pass.
3. Review and merge the generated `Release: Strawn packages` pull request.
4. Approve the protected `npm-release` environment deployment.
5. Confirm the npm provenance attestations and Git tags for both packages.

The release-readiness check intentionally blocks publication while the LinkedIn
redistribution review remains pending.

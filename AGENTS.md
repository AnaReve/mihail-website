# mihailolteanu.com development guidelines

This repository is the production source for mihailolteanu.com.

## Working principles

- Work on one scoped branch per change.
- Never commit directly to `main`.
- Keep changes limited to the requested scope.
- Do not modify unrelated files.
- Preserve the existing visual identity, layout, responsive behaviour, and content structure unless explicitly asked to change them.
- Reuse existing components, styles, and patterns before introducing new ones.
- Do not introduce secrets, credentials, tokens, passwords, private keys, or sensitive information into the repository.
- Do not commit generated dependencies or build output such as `node_modules/` or `dist/`.

## Validation

Before considering implementation complete:

- run `yarn lint`
- run `yarn build`
- resolve any errors introduced by the change
- report any pre-existing errors separately instead of hiding them
- summarize the files changed and validation performed

## Git and pull requests

Codex may:

- create feature or maintenance branches
- edit files
- run validation commands
- commit changes
- push the working branch
- create a pull request into `main`

Codex must not:

- merge a pull request
- push directly to `main`
- deploy to production
- change production configuration unless explicitly requested

The user retains final control over PR review, Netlify Deploy Preview acceptance, merge, and production verification.

## Pull request expectations

Keep PRs small and focused.

Each PR should clearly state:

- what changed
- why it changed
- which files were modified
- whether `yarn lint` passed
- whether `yarn build` passed

Do not combine unrelated cleanup, refactoring, redesign, or dependency changes with the requested work.

## Website-specific guidance

- Treat mobile and desktop behaviour as equally important.
- Preserve accessibility and semantic HTML.
- Avoid unnecessary dependencies.
- Keep performance in mind when adding images, animation, or JavaScript.
- Preserve the current Netlify deployment flow unless explicitly asked to change it.
- Do not change `netlify.toml`, DNS, domains, redirects, environment variables, or deployment settings without explicit approval.

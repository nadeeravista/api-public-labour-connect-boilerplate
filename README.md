### API app

- Swagger integration for documentation
- Docker can be used for local Postgress setup
- Use `nvm(.nvmrc)` - Node package management
- Knex - `Query builder - Transaction / Promises / Easy configuration`

- Serverless motive
  - S3 storage is - `https://console.filebase.com/`
  - Render / Railway - `https://dashboard.render.com/` | `https://railway.app/`

- Shortcut for managing project
  - https://app.shortcut.com/labour-connect/iterations

  ## Instruction for commits using `Semantic commits`

  https://www.conventionalcommits.org/en/v1.0.0/#specification
  - Available options - `fix: feat: build: chore: ci: docs: style: refactor: perf: test:`

  - `feat: allow provided config object to extend other configs` -- Typical feature development
  - `feat!: breaking change`
  - `feat(api)!: scoped commit message. api app in the this mono repo has a breaking change`
  - `fix: fixing a bug`
  - It will run `lint-staged`- only staged files will be checked

  ### Or do this

  ````
  ✗ npm run commit
  ? Select the type of change that you're committing: feat:     A new feature
  ? What is the scope of this change (e.g. component or file name): (press enter to skip) api
  ? Write a short, imperative tense description of the change (max 89 chars):
  (14) initial commit
  ? Provide a longer description of the change: (press enter to skip)

  ? Are there any breaking changes? No
  ? Does this change affect any open issues? (y/N) n```

  ````

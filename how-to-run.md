#### Tools

- docker
- bun or node
- pnpm
#### How to run local postgres 

`docker compose up -d`

#### How to run migrations

- `pnpm db:dev-migrate`
- `bun run db:dev-migrate`
- `npx drizzle-kit generate --config=drizzle.dev.config.ts`

#### How to run

- `pnpm dev`
- `bun run dev`

#### How to install dependencies

- `pnpm i`
- `bun install`

#### Variables

##### You need to create `.env.local` file and set the following variables

- `DATABASE_URL="postgres://postgres:password@localhost:5432/zimdev"`
- `GOOGLE_CLIENT_ID="1"`
- `GOOGLE_CLIENT_SECRET="1"`
- `GITHUB_CLIENT_ID="1"`
- `GITHUB_CLIENT_SECRET="1"`
- `SMTP_HOST="1"`
- `SMTP_PORT=22`
- `SMTP_USER="1"`
- `SMTP_PASSWORD="1"`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- `DATABASE_URL=postgres://postgres:password@localhost:5432/zimdev`


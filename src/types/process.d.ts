declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    NEXT_PUBLIC_APP_URL: string
    MOCK_SEND_EMAIL: string
    NEXTAUTH_SECRET: string
    SMTP_HOST: string
    SMTP_PORT: string
    SMTP_USER: string
    SMTP_PASSWORD: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string
      POSTGRES_PRISMA_URL: string
      POSTGRES_URL_NON_POOLING: string
      POSTGRES_USER: string
      POSTGRES_HOST: string
      POSTGRES_PASSWORD: string
      POSTGRES_DATABASE: string
      SUPABASE_SERVICE_ROLE_KEY: string
      SUPABASE_ANON_KEY: string
      SUPABASE_URL: string
      SUPABASE_JWT_SECRET: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      NEXT_PUBLIC_SUPABASE_URL: string
    }
  }
}

export {} 
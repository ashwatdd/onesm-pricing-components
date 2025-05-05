interface ImportMetaEnv {
  readonly PUBLIC_ONESM_BACKEND_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

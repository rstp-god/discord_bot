declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ACCESS_TOKEN: string,
            CLIENT_ID: string,
            OPENAI_TOKEN: string,
            PROXY_STRING: string
        }
    }
}

export {}

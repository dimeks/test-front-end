import LocalStorage from './LocalStorage'

export const auth = new LocalStorage<Partial<{ access_token: string }>>(
    "auth",
    {
        access_token: "",
    },
    localStorage
);
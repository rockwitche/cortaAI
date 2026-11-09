declare module 'googleapis' {
  export const google: {
    auth: {
      OAuth2: new (
        options: {
          clientId: string;
          clientSecret: string;
          redirectUri?: string;
          transporterOptions?: { timeout?: number; retry?: boolean };
        },
      ) => {
        setCredentials(credentials: { refresh_token?: string }): void;
        getAccessToken(): Promise<{ token?: string | null }>;
      };
    };
  };
}

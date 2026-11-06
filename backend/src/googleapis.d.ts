declare module 'googleapis' {
  export const google: {
    auth: {
      OAuth2: new (
        clientId: string,
        clientSecret: string,
        redirectUri?: string,
      ) => {
        setCredentials(credentials: { refresh_token?: string }): void;
        getAccessToken(): Promise<{ token?: string | null }>;
      };
    };
  };
}

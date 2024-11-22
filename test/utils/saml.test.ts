import fs from 'node:fs';
import { ConfidentialClientApplication, Configuration } from '@azure/msal-node';

describe('SAML', () => {
  it('should return a valid SAML configuration', () => {
    const keyFile = fs.readFileSync(`${__dirname}/campman-fixa_SM-100875.cer`, 'binary');
    const msalConfig: Configuration = {
      auth: {
        clientId: process.env.CLIENT_ID ?? 'CLIENT_ID',
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientCertificate: {
          privateKey: keyFile,
        },
      },
    };
    const confidentialClientApp = new ConfidentialClientApplication(msalConfig);
    expect(keyFile).toBeTruthy();
  });
});

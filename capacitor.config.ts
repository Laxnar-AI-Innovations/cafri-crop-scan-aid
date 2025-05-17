
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6ec3c1c289024450822b924c20f4d474',
  appName: 'cafri-crop-scan-aid',
  webDir: 'dist',
  server: {
    url: 'https://6ec3c1c2-8902-4450-822b-924c20f4d474.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;

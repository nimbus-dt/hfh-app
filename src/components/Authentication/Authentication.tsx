import { ThemeProvider, Authenticator } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';

const Authentication = () => (
  <CustomCard>
    <ThemeProvider
      theme={{
        name: 'homeownership-authentication',
        tokens: {
          components: {
            authenticator: {
              container: {
                widthMax: '100%',
              },
              router: {
                borderStyle: 'none',
                boxShadow: 'none',
              },
            },
          },
        },
      }}
    >
      <Authenticator />
    </ThemeProvider>
  </CustomCard>
);

export default Authentication;

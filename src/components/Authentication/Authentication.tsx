import { Authenticator } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';

const Authentication = () => (
  <CustomCard>
    <div className="theme-display">display</div>
    <div className="theme-headline-large">headline-large</div>
    <div className="theme-headline-medium">headline-medium</div>
    <div className="theme-subtitle-s1">subtitle-s1</div>
    <div className="theme-subtitle-s2">subtitle-s2</div>
    <div className="theme-body-medium">body-medium</div>
    <div className="theme-body-small">body-small</div>
    <div className="theme-button">button</div>
    <div className="theme-button-link">button-link</div>
    <div className="theme-caption">caption</div>
    <Authenticator />
  </CustomCard>
);

export default Authentication;

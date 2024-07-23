import { Loader } from '@aws-amplify/ui-react';

const Loading = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Loader
      style={{
        width: '2rem',
        height: '2rem',
      }}
      emptyColor="var(--amplify-colors-neutral-80)"
      filledColor="var(--amplify-colors-neutral-100)"
    />
  </div>
);

export default Loading;

const Error = ({ error }: { error?: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <span>{error || 'Something went wrong, try again later.'}</span>
  </div>
);

export default Error;

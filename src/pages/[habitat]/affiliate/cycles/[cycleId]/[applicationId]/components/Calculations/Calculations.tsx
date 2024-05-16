import Metrics from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]/components/Metrics/Metrics';

interface IProperties {
  formAnswers: unknown[];
}

const ApplicationTab = ({ formAnswers }: IProperties) => {
  const metrics: {
    [key: string]: {
      type?: 'percentage' | 'currency' | 'number';
      label?: string;
      header?: string;
      value?: string | number;
    };
  } = (
    formAnswers.at(formAnswers.length - 1) as {
      values: {
        metrics: {
          [key: string]: {
            type?: 'percentage' | 'currency' | 'number';
            label?: string;
            value?: string | number;
            header?: string;
          };
        };
      };
    }
  )?.values?.metrics;

  return (
    <div>
      <Metrics data={metrics} />
    </div>
  );
};

export default ApplicationTab;

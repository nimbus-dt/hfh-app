import Metrics from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]/components/Metrics/Metrics';

interface IProperties {
  formAnswers: unknown[];
}

const ApplicationTab = ({ formAnswers }: IProperties) => {
  const formAnswerWithMetrics = formAnswers.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (formAnswer: any) =>
      formAnswer.values && typeof formAnswer.values.metrics === 'object'
  );

  const metrics: {
    [key: string]: {
      type?: 'percentage' | 'currency' | 'number';
      label?: string;
      header?: string;
      value?: string | number;
    };
  } = (
    formAnswerWithMetrics as {
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

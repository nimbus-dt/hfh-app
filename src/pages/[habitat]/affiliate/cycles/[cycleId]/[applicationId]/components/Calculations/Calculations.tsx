import Metrics from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]/components/Metrics/Metrics';

interface IProperties {
  formAnswers: unknown[];
}

const ApplicationTab = ({ formAnswers }: IProperties) => {
  let metrics: {
    [key: string]: {
      type?: 'percentage' | 'currency' | 'number';
      label?: string;
      header?: string;
      value?: string | number;
    };
  } = {};

  if (
    (
      formAnswers.at(9) as {
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
    )?.values &&
    typeof (
      formAnswers.at(9) as {
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
    )?.values === 'object'
  ) {
    metrics = (
      formAnswers.at(9) as {
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
  }
  return (
    <div>
      <Metrics data={metrics} />
    </div>
  );
};

export default ApplicationTab;

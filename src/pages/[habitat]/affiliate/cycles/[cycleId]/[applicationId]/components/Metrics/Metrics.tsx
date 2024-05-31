import {
  formatNumberAsCurrency,
  formatNumberAsPercentage,
} from 'utils/formatters';
import styles from './Metrics.module.css';

export interface MetricsProps {
  data: {
    [key: string]: {
      header?: string;
      type?: 'percentage' | 'currency' | 'number';
      label?: string;
      value?: string | number;
    };
  };
}

const camelCaseToTitle = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const formatValue = (
  value?: string | number,
  type?: 'percentage' | 'currency' | 'number'
) => {
  switch (type) {
    case 'percentage':
      return formatNumberAsPercentage(value);
    case 'currency':
      return formatNumberAsCurrency(value);
    case 'number':
      return value;
    default:
      return 'N/A';
  }
};

const Metrics = ({ data }: MetricsProps) => {
  const metrics = [];
  for (const key in data) {
    const { label, value, type, header } = data[key];
    metrics.push({
      header,
      label: label || camelCaseToTitle(key),
      value: formatValue(value, type),
    });
  }

  return (
    <div className={styles.cards}>
      {metrics?.map((metric, index) => (
        <div key={index} className={styles.card}>
          {metric.header ? (
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: metric.header,
              }}
            />
          ) : (
            <p>{metric.label}</p>
          )}
          <p style={{ fontWeight: 'bold' }}>{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Metrics;

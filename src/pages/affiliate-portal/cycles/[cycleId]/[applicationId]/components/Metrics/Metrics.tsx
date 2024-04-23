import DataTable from 'components/DataTable';
import {
  formatNumberAsCurrency,
  formatNumberAsPercentage,
} from 'utils/formatters';

interface MetricsProps {
  data: {
    [key: string]: {
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
    const { label, value, type } = data[key];
    metrics.push({
      header: label || camelCaseToTitle(key),
      value: formatValue(value, type),
    });
  }
  return (
    <DataTable
      heading="Metrics"
      headingTextAlign="left"
      divider
      data={metrics}
    />
  );
};

export default Metrics;

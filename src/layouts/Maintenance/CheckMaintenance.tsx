import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Maintenance } from 'models';

interface CheckMaintenanceProps {
  children: ReactNode;
}

const CheckMaintenance = ({ children }: CheckMaintenanceProps) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      const response = await DataStore.query(Maintenance);

      const { maintenance } = response[0];

      if (maintenance) {
        navigate('/maintenance');
      }

      setLoading(false);
    };
    fetchMaintenance();
  }, [navigate]);

  if (loading) return null;

  return children;
};

export default CheckMaintenance;

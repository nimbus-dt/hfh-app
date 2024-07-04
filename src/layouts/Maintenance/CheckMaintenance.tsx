import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Maintenance } from 'models';

interface CheckMaintenanceProps {
  children: ReactNode;
}

const CheckMaintenance = ({ children }: CheckMaintenanceProps) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMaintenance = async () => {
      setLoading(true);

      const response = await DataStore.query(Maintenance);
      if (response.length < 0) return;

      const shouldNavigate = response[0]?.maintenance;

      if (shouldNavigate) {
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

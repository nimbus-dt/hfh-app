import { Image, Card, Flex } from '@aws-amplify/ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import logoHabitat from '../../assets/images/logoHabitat.svg';

// eslint-disable-next-line react/prop-types
export function ApplicantPrescreenNavBar({ menuSlot }) {
  const navigate = useNavigate();
  const urlName = useParams().habitat;

  const handleClick = () => {
    navigate(`/applicant/${urlName}/prescreen/prelim`);
  };

  return (
    <Card wrap width="100%" backgroundColor="#55B949" padding="0">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Image
          alt="Habitat Logo"
          src={logoHabitat}
          height="100%"
          onClick={handleClick}
        />
        <Flex marginRight="40px">{menuSlot}</Flex>
      </Flex>
    </Card>
  );
}

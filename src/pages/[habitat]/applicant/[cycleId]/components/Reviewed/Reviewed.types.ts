import { Habitat, TestApplication, TestCycle } from 'models';

interface ReviewedProps {
  habitat: Habitat;
  cycle: TestCycle;
  application: TestApplication;
  activeTab: number;
  setActiveTab: (newCurrent: number) => void;
}

export default ReviewedProps;

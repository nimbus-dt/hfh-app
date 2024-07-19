import { TFunction } from 'i18next';

import { ApplicationTypes } from 'models';

const typeInputsData = (t: TFunction<'translation', undefined>) => [
  {
    name: '',
    label: t(
      'pages.habitat.affiliate.cycles.cycle.components.filters.data.typeInputsData.online'
    ),
    type: ApplicationTypes.ONLINE,
  },
  {
    name: '',
    label: t(
      'pages.habitat.affiliate.cycles.cycle.components.filters.data.typeInputsData.paper'
    ),
    type: ApplicationTypes.PAPER,
  },
];

export default typeInputsData;

import { Habitat, TestApplication, TestCycle } from 'models';
import { PostHog } from 'posthog-js';

import { formatHabitatCycleApplicationData } from 'utils/formatters';

const posthogEvent = async ({
  posthog,
  type,
  page,
  habitat,
  cycle,
  application,
  error = false,
}: {
  posthog: PostHog;
  type: 'previous' | 'submit' | 'next';
  page: number;
  habitat: Habitat;
  cycle: TestCycle;
  application: TestApplication;
  error?: boolean;
}) => {
  const event = {
    previous: `form_previous_${error ? 'error_' : ''}from_page_${
      page + 1
    }_to_page_${page}`,
    submit: `form_submit_${error ? 'error_' : ''}from_page_${page + 1}`,
    next: `form_next_${error ? 'error_' : ''}from_page_${page + 1}_to_page_${
      page + 2
    }`,
  }[type];

  return posthog?.capture(
    event,
    formatHabitatCycleApplicationData({
      habitat,
      cycle,
      application,
    })
  );
};

export default posthogEvent;

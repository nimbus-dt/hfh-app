import { Components } from 'formiojs';
import { ComponentProps, OptionsProps, DataProps } from './ReviewProps';

import styles from './Review.module.css';

class Review extends Components.components.container {
  constructor(
    component: ComponentProps,
    options: OptionsProps,
    data: DataProps
  ) {
    const disableComponent = {
      ...(
        options.root.components?.at(component.page - 1)?.components?.at(0) || {}
      ).component,
      customClass: styles.page,
      disabled: true,
    };
    super(disableComponent, options, data);
  }
}

export default Review;

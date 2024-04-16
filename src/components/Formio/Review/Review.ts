/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';

import styles from './Review.module.css';

class Review extends Components.components.fieldset {
  render(): HTMLElement {
    const { label, reviewFields, key } = this.component;
    return super.render(`
        <div class="review">
            <h2 class="accordion-header ${
              styles.review__heading
            }" id="heading${key}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                ${label}
                </button>
            </h2>
            <div id="collapse${key}" class="accordion-collapse collapse show" aria-labelledby="heading${key}" data-bs-parent="#accordion${key}">
                <div class="accordion-body">
                    ${reviewFields
                      .map((field: { path: string; label: string }) => {
                        const { path: fieldPath, label: fieldLabel } = field;
                        const location = fieldPath.split('.');
                        const page = location[0];
                        const section = location[1];
                        const keyField = location[2];
                        const value = this.root.data[page][section][keyField];
                        return `
                            <div class="${styles.review__item}">
                                <label class="${styles.review__label}">${fieldLabel}</label>
                                <span class="${styles.review__value}">${value}</span>
                            </div>
                        `;
                      })
                      .join('')}
                    <div class="${styles.review__buttons}">
                        <button class="${
                          styles.review__button__edit
                        }" ref="button-edit-${key}">Edit</button>
                        <button class="${
                          styles.review__button__confirm
                        }" ref="button-confirm-${key}">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    `);
  }

  attach(element: HTMLElement): HTMLElement {
    super.attach(element);

    this.loadRefs(element, {
      [`button-edit-${this.component.key}`]: 'single',
      [`button-confirm-${this.component.key}`]: 'single',
    });

    this.refs[`button-edit-${this.component.key}`].addEventListener(
      'click',
      () => {
        this.root.setPage(this.component.page - 1);
      }
    );

    this.refs[`button-confirm-${this.component.key}`].addEventListener(
      'click',
      () => {
        this.updateValue(true, {}, 'review');
      }
    );

    return super.attach(element);
  }
}

export default Review;

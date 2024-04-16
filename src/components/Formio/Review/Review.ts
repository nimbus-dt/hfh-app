/* eslint-disable import/no-extraneous-dependencies */
import { Components, ExtendedComponentSchema } from 'formiojs';
import { DataStore } from 'aws-amplify';
import { FormAnswer } from 'models';

import './Review.style.css';

class Review extends Components.components.fieldset {
  render(): HTMLElement {
    const { label, reviewFields, key } = this.component;
    return super.render(`
        <div class="review">
            <h2 class="accordion-header review__heading" id="heading${key}">
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
                        const value = this.data[page][section][keyField];
                        return `
                            <div class="review__item">
                                <label class="review__label">${fieldLabel}</label>
                                <span class="review__value">${value}</span>
                            </div>
                        `;
                      })
                      .join('')}
                    <div class="review__buttons">
                        <button class="review__button--edit" ref="button-edit-${key}">Edit</button>
                        <button class="review__button--confirm" ref="button-confirm-${key}">Confirm</button>
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
        console.log(this);
        console.log('edit');
        this.root.setPage(this.component.page - 1);
      }
    );

    this.refs[`button-confirm-${this.component.key}`].addEventListener(
      'click',
      () => {
        console.log(this);
        console.log('confirm');
      }
    );

    return super.attach(element);
  }
}

export default Review;

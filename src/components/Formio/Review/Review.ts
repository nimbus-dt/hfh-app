/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';

import styles from './Review.module.css';

const keyToQuestion = (key: string) => {
  // Income
  if (key.includes('TypeOfIncome')) return 'Type of income';
  if (key.includes('SourceOfIncome')) return 'Source of Income';
  if (key.includes('ProofOfIncome')) return 'Proof of income';
  if (key.includes('MonthlyIncome')) return 'Monthly income';
  // Debt
  if (key.includes('TypeOfDebt')) return 'Type of debt';
  if (key.includes('DebtDescription')) return 'Debt description';
  if (key.includes('ProofOfDebt')) return 'Proof of debt';
  if (key.includes('MonthlyDebtPayment')) return 'Monthly debt payment';
  if (key.includes('UnpaidBalance')) return 'Unpaid balance';
  if (key.includes('MonthsLeftToPaid')) return 'Months left to paid';
  // Asset
  if (key.includes('TypeOfAsset')) return 'Type of asset';
  if (key.includes('ProofOfAssetOwnership')) return 'Proof of asset ownership';
  if (key.includes('CurrentAssetValue')) return 'Current asset value';
  if (key.includes('NameOfInstitution'))
    return 'Name of institution where asset is held / Asset Location';

  return null;
};

const valueToAnswer = (value: unknown) => {
  if (typeof value === 'string') {
    if (value === 'iAmApplyingForIndividualCredit')
      return 'I am applying for individual credit.';
    if (value === 'iAmApplyingForJointCredit')
      return 'I am applying for joint credit.';
    if (value === 'eachBorrowerIntendsToApplyForJointCredit')
      return 'Each borrower intends to apply for joint credit.';

    return value;
  }
  if (typeof value === 'number') return value;
  if (Array.isArray(value) && value.length > 0 && value[0]?.storage) {
    return value.map((file) => file.originalName).join(', ');
  }

  return null;
};

class Review extends Components.components.fieldset {
  render(): HTMLElement {
    console.log(this);
    const { label, reviewFields, key, page } = this.component;

    const componentKey = key.replace(/Review/gi, '');

    if (this.root.data[`page${page}`][componentKey] === undefined) {
      return super.render('');
    }

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
                        const pageField = location[0];
                        const sectionField = location[1];
                        const keyField = location[2];
                        const value =
                          this.root.data[pageField][sectionField][keyField];
                        if (!value) return '';
                        if (Array.isArray(value)) {
                          let text = `<div class="${styles.review__item}">`;
                          value.forEach((element, i) => {
                            text += `<label class="${
                              styles.review__label
                            }">${fieldLabel} ${i + 1}</label>`;
                            const questions = Object.keys(element);
                            const answers = Object.values(element);
                            questions.forEach((question, j) => {
                              text += `<span class="${
                                styles.questionAndAnswer
                              }">${keyToQuestion(question)}: ${valueToAnswer(
                                answers[j]
                              )}</span>`;
                            });
                          });
                          text += `</div>`;
                          return text;
                        }
                        return `
                            <div class="${styles.review__item}">
                                <label class="${
                                  styles.review__label
                                }">${fieldLabel}</label>
                                <span class="${
                                  styles.review__value
                                }">${valueToAnswer(value)}</span>
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

    const buttonEditKey = `button-edit-${this.component.key}`;
    const buttonConfirmKey = `button-confirm-${this.component.key}`;

    this.loadRefs(element, {
      [`button-edit-${this.component.key}`]: 'single',
      [`button-confirm-${this.component.key}`]: 'single',
    });

    if (!this.refs[buttonEditKey] || !this.refs[buttonConfirmKey])
      return super.attach(element);

    this.refs[buttonEditKey].addEventListener('click', () => {
      this.root.setPage(this.component.page - 1);
    });

    this.refs[buttonConfirmKey].addEventListener('click', () => {
      this.updateValue(true, {}, 'review');

      const { data } = this.root;
      const pages = Object.values(data);
      for (let i = 0; i < pages.length; i += 1) {
        const components = Object.values(pages[i]);
        const componentsName = Object.keys(pages[i]);
        console.log(componentsName);
        for (let j = 0; j < components.length; j += 1) {
          const properties = Object.keys(components[j]);
          const ans = properties.map((property) => ({
            path: `page${i}.${componentsName[j]}.${property}`,
            label: '',
          }));
          console.log(ans);
        }
      }
    });

    return super.attach(element);
  }
}

export default Review;

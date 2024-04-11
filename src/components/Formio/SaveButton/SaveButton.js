/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';
import { DataStore } from 'aws-amplify';
import { FormAnswer } from 'models';
import { form } from '@formio/react';

const saveSection = async ({ data, application, page, section }) => {
  try {
    const persistedFormAnswer = await DataStore.query(FormAnswer, (c1) =>
      c1.and((c2) => {
        const criteriaArray = [
          c2.testapplicationID.eq(application.id),
          c2.page.eq(page),
          c2.section.eq(section),
        ];

        return criteriaArray;
      })
    );

    if (persistedFormAnswer.length > 0) {
      const response = await DataStore.save(
        FormAnswer.copyOf(persistedFormAnswer[0], (original) => {
          original.values = data;
        })
      );
      console.log('update response', response);
    } else {
      const response = await DataStore.save(
        new FormAnswer({
          testapplicationID: application.id,
          page,
          section,
          values: data,
        })
      );
      console.log('save response', response);
      return true;
    }
  } catch (error) {
    return false;
  }
};

class SaveButton extends Components.components.button {
  async __getFormAnswer(application, page, section) {
    try {
      const persistedFormAnswer = await DataStore.query(FormAnswer, (c1) =>
        c1.and((c2) => {
          const criteriaArray = [
            c2.testapplicationID.eq(application.id),
            c2.page.eq(page),
            c2.section.eq(section),
          ];

          return criteriaArray;
        })
      );

      if (persistedFormAnswer.length > 0) {
        this.refs.button.innerText = 'Edit';
      }
    } catch (error) {
      console.log('Error retrieving form answer');
    }
  }

  attach(element) {
    super.attach(element);
    const path = this.path.split('.');
    const page = path[0];
    const section = path[1];
    const { application } = this.options.additional;
    this.__getFormAnswer(application, page, section);
  }

  async __onSave(data, application, page, section) {
    const response = await saveSection({ data, application, page, section });
    if (response) {
      this.refs.button.innerText = 'Edit';
    }
  }

  onClick(event) {
    event.preventDefault();
    const { data } = this;
    const path = this.path.split('.');
    const page = path[0];
    const section = path[1];
    const { application } = this.options.additional;
    this.__onSave(data, application, page, section);
  }
}

export default SaveButton;

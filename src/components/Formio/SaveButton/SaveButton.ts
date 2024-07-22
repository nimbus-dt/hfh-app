/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';
import { DataStore } from 'aws-amplify/datastore';
import { FormAnswer, TestApplication } from 'models';
import { isElement } from 'utils/type';

const saveSection = async ({
  data,
  application,
  page,
  section,
}: {
  data: unknown;
  application: TestApplication;
  page: string;
  section: string;
}) => {
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
      await DataStore.save(
        FormAnswer.copyOf(persistedFormAnswer[0], (original) => {
          original.values = JSON.stringify(data);
        })
      );
    } else {
      await DataStore.save(
        new FormAnswer({
          testapplicationID: application.id,
          page,
          section,
          values: JSON.stringify(data),
        })
      );
    }
    return true;
  } catch (error) {
    return false;
  }
};

class SaveButton extends Components.components.button {
  async __getFormAnswer(
    application: TestApplication,
    page: string,
    section: string
  ) {
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

      if (
        persistedFormAnswer.length > 0 &&
        'button' in this.refs &&
        isElement(this.refs.button) &&
        'innerText' in this.refs.button
      ) {
        this.refs.button.innerText = 'Edit';
      }
    } catch (error) {
      console.log('Error retrieving form answer');
    }
  }

  attach(element: unknown) {
    super.attach(element);
    if ('path' in this && typeof this.path === 'string') {
      const path = this.path.split('.');
      const page = path[0];
      const section = path[1];
      const { application } = this.options.additional;
      this.__getFormAnswer(application, page, section);
    }
  }

  async __onSave(
    data: unknown,
    application: TestApplication,
    page: string,
    section: string
  ) {
    const response = await saveSection({ data, application, page, section });
    if (
      response &&
      'button' in this.refs &&
      isElement(this.refs.button) &&
      'innerText' in this.refs.button
    ) {
      this.refs.button.innerText = 'Edit';
    }
  }

  onClick(event: Event) {
    event.preventDefault();
    const { data } = this;
    if ('path' in this && typeof this.path === 'string') {
      const path = this.path.split('.');
      const page = path[0];
      const section = path[1];
      const { application } = this.options.additional;
      this.__onSave(data, application, page, section);
    }
  }
}

export default SaveButton;

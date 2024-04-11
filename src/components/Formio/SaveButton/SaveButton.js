/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';
import { DataStore } from 'aws-amplify';
import { FormAnswer } from 'models';

const saveSection = async ({ data, application, page, section }) => {
  const response = await DataStore.save(
    new FormAnswer({
      testapplicationID: application.id,
      page,
      section,
      values: data,
    })
  );

  console.log(response);
};

class SaveButton extends Components.components.button {
  onClick(event) {
    event.preventDefault();

    const { data } = this;
    const path = this.path.split('.');
    const page = path[0];
    const section = path[1];
    const { application } = this.options.additional;

    saveSection({ data, application, page, section });
  }
}

export default SaveButton;

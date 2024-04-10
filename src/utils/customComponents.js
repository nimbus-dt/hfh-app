/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';

const type = {
  saveApplicantBasicInformation: (data) => {
    const basicInfo = {
      fullName: data.applicantBasicInformationFullName,
      altOrFormerName: data.applicantBasicInformationAlternativeName,
      socialSecurityNumber: data.applicantBasicInformationSocialSecurityNumber,
      homePhone: data.applicantBasicInformationHomePhone,
      cellPhone: data.applicantBasicInformationCellPhone,
      workPhone: data.applicantBasicInformationWorkPhone,
      birthDate: data.applicantBasicInformationDateOfBirth,
      maritalStatus: data.applicantBasicInformationMaritalStatus,
    };

    console.log(basicInfo);
  },
};

class SaveButton extends Components.components.button {
  onClick(event) {
    event.preventDefault();
    console.log('onClick!', this);

    const onClickFunction = type[this.component.key];

    if (onClickFunction) {
      onClickFunction(this._data);
    } else {
      console.warn('No onClick function defined for this button');
    }
  }
}

Components.setComponents({
  saveButton: SaveButton,
});

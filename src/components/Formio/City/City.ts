/* eslint-disable import/no-extraneous-dependencies */
import { API } from 'aws-amplify';
import { Components } from 'formiojs';
import { debounce } from 'lodash';

interface getCityProps {
  cityNameQuery?: string;
  state: string;
}

const getCities = async ({ cityNameQuery, state }: getCityProps) => {
  const newCities = await API.get(
    'public',
    `/cities?cityNameQuery=${cityNameQuery}&state=${state}`,
    {}
  );

  return newCities.map((city: { city: string }) => ({
    value: city.city,
    label: city.city,
  }));
};

class City extends Components.components.select {
  updateChoices = (inputValue?: string) => {
    Object.keys(this.data).forEach((key) => {
      if (key.toLowerCase().includes('state')) {
        getCities({ cityNameQuery: inputValue, state: this.data[key] }).then(
          (options) => {
            this.choices.setChoices(options, 'value', 'label', true);
          }
        );
      }
    });
  };

  attach(element: HTMLElement) {
    const attach = super.attach(element);

    this.addEventListener(
      element,
      'input',
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const inputValue = event.target.value;
        this.updateChoices(inputValue);
      }, 300)
    );

    this.addEventListener(
      element,
      'click',
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const inputValue = event.target.value;
        this.updateChoices(inputValue);
      }, 300)
    );

    this.addEventListener(
      element,
      'focusout',
      (event: React.ChangeEvent<HTMLInputElement>) => (event.target.value = '')
    );

    return attach;
  }
}

export default City;

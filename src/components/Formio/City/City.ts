/* eslint-disable import/no-extraneous-dependencies */
import { Components } from 'formiojs';

class City extends Components.components.select {
  constructor(component, options, data) {
    console.log(component, options, data);
    super(component, options, data);
  }
}

export default City;

import { Components } from 'formiojs';

import SaveButton from './SaveButton';
import City from './City';
import CustomContainer from './CustomContainer';
import Review from './Review';

Components.setComponents({
  saveButton: SaveButton,
  city: City,
  container: CustomContainer,
  review: Review,
});

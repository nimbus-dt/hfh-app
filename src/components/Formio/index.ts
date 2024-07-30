import { Components, Templates } from 'formiojs';
import SaveButton from './SaveButton';
import City from './City';
import Review from './Review';
import Pages from './Pages';
import CustomFile from './CustomFile';
import CustomFileTemplate from './CustomFile/CustomFile.template';

Templates.defaultTemplates.file.form = CustomFileTemplate;

Components.setComponents({
  saveButton: SaveButton,
  city: City,
  review: Review,
  pages: Pages,
  file: CustomFile,
});

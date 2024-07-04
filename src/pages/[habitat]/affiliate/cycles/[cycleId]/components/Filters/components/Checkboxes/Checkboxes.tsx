import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { CheckboxField } from '@aws-amplify/ui-react';

import styles from './Checkboxes.module.css';

interface CheckboxesProps<Type extends FieldValues> {
  control: Control<Type>;
  title: string;
  name: Path<Type>;
  data: { name: string; label: string; type: string }[];
}

const Checkboxes = <Type extends FieldValues>({
  control,
  title,
  name,
  data,
}: CheckboxesProps<Type>) => (
  <div className={styles.inputContainer}>
    <div className={`theme-body-small ${styles.inputTitle}`}>
      <span>{title}</span>
    </div>
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          {data.map((element) => (
            <CheckboxField
              key={element.label}
              name={element.name}
              label={element.label}
              checked={value === element.type}
              onChange={(event) =>
                onChange(event.target.checked ? element.type : null)
              }
              className={styles.customCheckbox}
            />
          ))}
        </>
      )}
    />
  </div>
);

export default Checkboxes;

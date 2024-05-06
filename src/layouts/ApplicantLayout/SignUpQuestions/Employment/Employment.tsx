import { useForm, SubmitHandler } from 'react-hook-form';
import { MdArrowDropDown } from 'react-icons/md';
import { throttle } from 'lodash';

import Footer from 'components/Footer';

import styles from '../SignUpQuestions.module.css';
import dataProps from '../types';

interface Inputs {
  unemployed: 'Yes' | 'No';
  position: string;
  employer: string;
}

interface EmploymentProps {
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
  goBack: () => void;
}

const Employment = ({ data, setData, goBack }: EmploymentProps) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const watchUnemployed = watch('unemployed') || data?.employment?.unemployed;

  const onSubmit: SubmitHandler<Inputs> = (employmentData) => {
    setData((prev) => ({
      ...prev,
      current: prev.current + 1,
      employment: employmentData,
    }));
    console.log(data);
  };

  return (
    <form
      className={styles.background}
      onSubmit={throttle(handleSubmit(onSubmit), 500)}
    >
      <div className={styles.body}>
        <div>
          <label
            htmlFor="unemployed"
            className={`theme-body-medium ${styles.label}`}
          >
            Are you currently unemployed?
          </label>
          <div>
            <div className={styles.select}>
              <select
                id="unemployed"
                className={styles.select_input}
                defaultValue={data?.employment?.unemployed || 'No'}
                {...register('unemployed', { required: true })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <MdArrowDropDown size="1.5rem" className={styles.arrow} />
            </div>
            {errors.unemployed && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        {watchUnemployed === 'Yes' && (
          <>
            <div>
              <label
                htmlFor="position"
                className={`theme-body-medium ${styles.label}`}
              >
                What is your current work title?
              </label>
              <div>
                <input
                  id="position"
                  type="string"
                  placeholder="Position"
                  defaultValue={data?.employment?.position || ''}
                  className={`theme-body-medium ${styles.number_input}`}
                  {...register('position', { required: true })}
                />
                {errors.position && (
                  <span className={`${styles.error} theme-body-small`}>
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="employer"
                className={`theme-body-medium ${styles.label}`}
              >
                What is the name of your employer?
              </label>
              <div>
                <input
                  id="employer"
                  type="string"
                  placeholder="Employer"
                  defaultValue={data?.employment?.employer || ''}
                  className={`theme-body-medium ${styles.number_input}`}
                  {...register('employer', { required: true })}
                />
                {errors.employer && (
                  <span className={`${styles.error} theme-body-small`}>
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer goBack={goBack} />
    </form>
  );
};

export default Employment;

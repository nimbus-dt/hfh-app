import { useForm, SubmitHandler } from 'react-hook-form';
import { throttle } from 'lodash';

import styles from '../SignUpQuestions.module.css';
import Footer from '../Footer';
import dataProps from '../types';

interface Inputs {
  members: number;
  income: number;
}

interface HouseholdProps {
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
  goBack: () => void;
}

const Household = ({ data, setData, goBack }: HouseholdProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (householdData) => {
    setData((prev) => ({
      ...prev,
      current: prev.current + 1,
      household: householdData,
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
            htmlFor="members"
            className={`theme-body-medium ${styles.label}`}
          >
            How many people reside with you in your household?
          </label>
          <div>
            <input
              id="members"
              type="number"
              placeholder="Number of people"
              defaultValue={data?.household?.members || ''}
              className={`theme-body-medium ${styles.number_input}`}
              {...register('members', { required: true })}
            />
            {errors.members && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="income"
            className={`theme-body-medium ${styles.label}`}
          >
            What is your household's annual income?
          </label>
          <div>
            <input
              id="income"
              type="number"
              placeholder="Annual income"
              defaultValue={data?.household?.income || ''}
              className={`theme-body-medium ${styles.number_input}`}
              {...register('income', { required: true })}
            />
            {errors.income && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
      </div>
      <Footer goBack={goBack} />
    </form>
  );
};

export default Household;

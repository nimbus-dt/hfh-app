import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DataStore } from 'aws-amplify';
import { throttle } from 'lodash';

import Footer from 'components/Footer';
import { Habitat as HabitatModel, User, Sexs, UserTypes } from 'models';

import styles from '../SignUpQuestions.module.css';
import dataProps from '../types';

interface Inputs {
  source: string;
  firstTime: 'Yes' | 'No';
  interest: string;
}

interface HabitatProps {
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
  goBack: () => void;
  habitat: HabitatModel;
  user: {
    username: string;
  };
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const Habitat = ({
  data,
  setData,
  goBack,
  habitat,
  user,
  setUserData,
}: HabitatProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (habitatData) => {
    try {
      setData((prev) => ({
        ...prev,
        habitat: habitatData,
      }));

      const sexByModel = Sexs[data.general?.sex || 'OTHER'];

      const newUser = {
        firstName: data.general?.firstName || '',
        lastName: data.general?.lastName || '',
        dateOfBirth: data.general?.dob || '',
        sex: sexByModel,
        phoneNumber: data.general?.phone || '',
        applicantProps: {
          state: data.general?.state || '',
          city: data.general?.city || '',
          street: data.general?.street || '',
          householdMembersNumber: data.household?.members || 0,
          householdAnnualIncome: data.household?.income || 0,
          currentlyUnemployed: data.employment?.unemployed || '',
          currentWorkTitle: data.employment?.position || '',
          nameOfEmployer: data.employment?.employer || '',
          howDidYouHearAbout: habitatData?.source || '',
          firstTimeApplying: habitatData?.firstTime || '',
          whatAreYouInterestedIn: habitatData?.interest || '',
        },
        type: UserTypes.APPLICANT,
        owner: user.username,
      };
      const response = await DataStore.save(new User(newUser));
      setUserData(response);
    } catch (error) {
      setError('Something went wrong!, refresh the page and try again.');
    }
  };

  return (
    <form
      className={styles.background}
      onSubmit={throttle(handleSubmit(onSubmit), 500)}
    >
      <div className={styles.body}>
        <div>
          <label
            htmlFor="source"
            className={`theme-body-medium ${styles.label}`}
          >
            How did you hear about {habitat?.name}?
          </label>
          <div>
            <input
              id="source"
              placeholder="I attended an information session last fall."
              defaultValue={data?.habitat?.source || ''}
              className={`theme-body-medium ${styles.text_input}`}
              type="string"
              {...register('source', { required: true })}
            />
            {errors.source && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <p>Is this your first time applying to a Habitat program?</p>
          <div className={styles.column}>
            <label htmlFor="firstTime-Yes" className={styles.radio_label}>
              <input
                defaultChecked={data?.habitat?.firstTime === 'Yes'}
                className={styles.radio_input}
                type="radio"
                id="firstTime-Yes"
                {...register('firstTime')}
                value="Yes"
              />
              <span className={styles.radio_circle} />
              <span className={styles.radio_checkmark} />
              <span className={styles.radio_mini_circle} />
              Yes
            </label>
            <label htmlFor="firstTime-No" className={styles.radio_label}>
              <input
                defaultChecked={data?.habitat?.firstTime === 'No'}
                className={styles.radio_input}
                type="radio"
                id="firstTime-No"
                {...register('firstTime')}
                value="No"
              />
              <span className={styles.radio_circle} />
              <span className={styles.radio_checkmark} />
              <span className={styles.radio_mini_circle} />
              No
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="interest"
            className={`theme-body-medium ${styles.label}`}
          >
            What are you interested in applying to a Habitat program? Tell us
            more about your situation.
          </label>
          <div>
            <textarea
              id="interest"
              rows={5}
              placeholder="I am interested in the Homeownership program Habitat has to offer because my family and I need a new home that is apt for our living conditions."
              defaultValue={data?.habitat?.interest || ''}
              className={`theme-body-medium ${styles.text_input}`}
              {...register('interest', { required: true })}
            />
            {errors.interest && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <Footer goBack={goBack} submit />
    </form>
  );
};

export default Habitat;

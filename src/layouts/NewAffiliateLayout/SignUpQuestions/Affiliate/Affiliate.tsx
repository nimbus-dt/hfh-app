import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DataStore } from 'aws-amplify';
import { throttle } from 'lodash';

import Footer from 'components/Footer';
import { Habitat as HabitatModel, Sexs, User, UserTypes } from 'models';

import { MdArrowDropDown } from 'react-icons/md';
import styles from '../SignUpQuestions.module.css';
import dataProps from '../types';
import months from '../utils/months';
import years from '../utils/years';

interface Inputs {
  position: string;
  description: string;
  joinMonth: string;
  joinYear: string;
}

interface AffiliateProps {
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
  goBack: () => void;
  habitat: HabitatModel;
  user: {
    username: string;
  };
}

const Affiliate = ({
  data,
  setData,
  goBack,
  habitat,
  user,
}: AffiliateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (affiliateData) => {
    try {
      const sexByModel = Sexs[data.general?.sex || 'OTHER'];
      const newUser = {
        firstName: data.general?.firstName || '',
        lastName: data.general?.lastName || '',
        dateOfBirth: data.general?.dob || '',
        sex: sexByModel,
        phoneNumber: data.general?.phone || '',
        affiliateProps: {
          titleAtHabitat: affiliateData?.position || '',
          roleDescription: affiliateData?.description || '',
          joinMonth: affiliateData?.joinMonth || '',
          joinYear: affiliateData?.joinYear || '',
        },
        type: UserTypes.AFFILIATE,
        owner: user.username,
      };
      await DataStore.save(new User(newUser));
      setData((prev) => ({
        ...prev,
        current: prev.current + 1,
        affiliate: affiliateData,
      }));
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
            htmlFor="position"
            className={`theme-body-medium ${styles.label}`}
          >
            What is your current title at {habitat.name}?
          </label>
          <div>
            <input
              id="position"
              placeholder="Homeownership Services Coordinator"
              defaultValue={data?.affiliate?.position || ''}
              className={`theme-body-medium ${styles.text_input}`}
              type="string"
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
            htmlFor="interest"
            className={`theme-body-medium ${styles.label}`}
          >
            Tell us about what your role looks like.
          </label>
          <div>
            <textarea
              id="description"
              rows={5}
              placeholder="I run all things Homeownership! When I am not planning our application cycles, I lead our team in the admision process for our Homeownership Program."
              defaultValue={data?.affiliate?.description || ''}
              className={`theme-body-medium ${styles.text_input}`}
              {...register('description', { required: true })}
            />
            {errors.description && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="joinMonth"
            className={`theme-body-medium ${styles.label}`}
          >
            When did you join {habitat.name}?
          </label>
          <div className={styles.fullname}>
            <div>
              <div className={styles.select}>
                <select
                  id="joinMonth"
                  className={styles.select_input}
                  defaultValue={data?.affiliate?.joinMonth || 'September'}
                  {...register('joinMonth', { required: true })}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <MdArrowDropDown size="1.5rem" className={styles.arrow} />
              </div>
              {errors.joinMonth && (
                <span className={`${styles.error} theme-body-small`}>
                  This field is required
                </span>
              )}
            </div>
            <div>
              <div className={styles.select}>
                <select
                  id="joinYear"
                  className={styles.select_input}
                  defaultValue={data?.affiliate?.joinYear || '2013'}
                  {...register('joinYear', { required: true })}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <MdArrowDropDown size="1.5rem" className={styles.arrow} />
              </div>
              {errors.joinYear && (
                <span className={`${styles.error} theme-body-small`}>
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <Footer goBack={goBack} submit />
    </form>
  );
};

export default Affiliate;

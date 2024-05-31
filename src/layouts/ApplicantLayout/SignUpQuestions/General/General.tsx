import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdArrowDropDown } from 'react-icons/md';
import { throttle } from 'lodash';

import Footer from 'components/Footer';
import states from 'assets/jsons/states.json';

import { API } from 'aws-amplify';
import styles from '../SignUpQuestions.module.css';
import dataProps from '../types';

interface Inputs {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  sex: 'MALE' | 'FEMALE' | 'OTHER';
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

interface City {
  id: string;
  city: string;
}

interface GeneralProps {
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
}

const General = ({ data, setData }: GeneralProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const watchState = watch(['state']);

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState(data?.general?.city || '');

  const handleCityChange = async () => {
    if (selectedCity.length > 0) {
      try {
        const response = await API.get(
          'public',
          `/cities?cityNameQuery=${selectedCity}&state=${watchState}`,
          {}
        );
        setCities(response);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      setCities([]);
    }
  };

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setCities([]);
  };

  const onSubmit: SubmitHandler<Inputs> = (generalData) => {
    setData((prev) => ({
      ...prev,
      current: prev.current + 1,
      general: {
        ...generalData,
        city: selectedCity,
      },
    }));
  };

  return (
    <form
      className={styles.background}
      onSubmit={throttle(handleSubmit(onSubmit), 500)}
    >
      <div className={styles.body}>
        <div>
          <label
            htmlFor="firstName"
            className={`theme-body-medium ${styles.label}`}
          >
            What is your name?
          </label>
          <div className={styles.fullname}>
            <div>
              <input
                id="firstName"
                placeholder="John"
                defaultValue={data?.general?.firstName || ''}
                {...register('firstName', { required: true })}
                className={`${styles.text_input} theme-body-medium`}
              />
              {errors.firstName && (
                <span className={`${styles.error} theme-body-small`}>
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                id="lastName"
                placeholder="Doe"
                defaultValue={data?.general?.lastName || ''}
                {...register('lastName', { required: true })}
                className={`${styles.text_input} theme-body-medium`}
              />
              {errors.lastName && (
                <span className={`${styles.error} theme-body-small`}>
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="dob" className={`theme-body-medium ${styles.label}`}>
            What is your date of birth?
          </label>
          <div>
            <input
              id="dob"
              type="date"
              defaultValue={data?.general?.dob || ''}
              className={`theme-body-medium ${styles.date_input}`}
              {...register('dob', { required: true })}
            />
            {errors.dob && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className={`theme-body-medium ${styles.label}`}
          >
            What is your phone number?
          </label>
          <div>
            <input
              id="phone"
              type="tel"
              placeholder="(000) 000 0000"
              defaultValue={data?.general?.phone || ''}
              {...register('phone', {
                required: true,
                pattern: /\(\d{3}\) \d{3}-\d{4}/,
              })}
              onChange={(e) => {
                const { value } = e.target;
                e.target.value = value
                  .replace(/\D/g, '')
                  .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
                  .replace(/(-\d{4})\d+?$/, '$1');
              }}
              className={`${styles.text_input} theme-body-medium`}
            />
            {errors.phone?.type === 'required' && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
            {errors.phone?.type === 'pattern' && (
              <span className={`${styles.error} theme-body-small`}>
                Invalid Phone Number, should be in the format (XXX) XXX-XXXX
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="sex" className={`theme-body-medium ${styles.label}`}>
            What is your sex?
          </label>
          <div>
            <div className={styles.select}>
              <select
                id="sex"
                className={styles.select_input}
                defaultValue={data?.general?.sex || ''}
                {...register('sex', { required: true })}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <MdArrowDropDown size="1.5rem" className={styles.arrow} />
            </div>
            {errors.sex && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="state"
            className={`theme-body-medium ${styles.label}`}
          >
            State
          </label>
          <div>
            <div className={styles.select}>
              <select
                id="state"
                className={styles.select_input}
                defaultValue={data?.general?.state || 'CA'}
                {...register('state', { required: true })}
              >
                {states.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>
              <MdArrowDropDown size="1.5rem" className={styles.arrow} />
            </div>
            {errors.state && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="city" className={`theme-body-medium ${styles.label}`}>
            City
          </label>
          <div>
            <input
              id="city"
              type="string"
              placeholder="Los Angeles"
              value={selectedCity}
              {...register('city', { required: true })}
              onChange={async (event) => {
                setSelectedCity(event.target.value);
                handleCityChange();
              }}
              className={`${styles.text_input} theme-body-medium`}
            />
            {cities.length > 0 && (
              <ul
                style={{
                  border: '1px solid #ccc',
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}
              >
                {cities.map((city) => (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    key={city.id}
                    onClick={() => handleSelectCity(city.city)}
                    onKeyPress={() => handleSelectCity(city.city)}
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >
                    {city.city}
                  </li>
                ))}
              </ul>
            )}
            {errors.city && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="street"
            className={`theme-body-medium ${styles.label}`}
          >
            Street
          </label>
          <div>
            <input
              id="street"
              placeholder="123 Main St"
              defaultValue={data?.general?.street || ''}
              className={`theme-body-medium ${styles.text_input}`}
              type="string"
              {...register('street', { required: true })}
            />
            {errors.street && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="zipCode"
            className={`theme-body-medium ${styles.label}`}
          >
            Zip Code
          </label>
          <div>
            <input
              id="zipCode"
              type="string"
              placeholder="90001"
              defaultValue={data?.general?.zipCode || ''}
              {...register('zipCode', {
                required: true,
                pattern: /^(\d{5}-\d{4}|\d{5})$/,
              })}
              onChange={(e) => {
                const { value } = e.target;
                e.target.value = value
                  .replace(/\D/g, '')
                  .replace(/(\d{5})(\d{4})/, '$1-$2')
                  .replace(/(-\d{4})\d+?$/, '$1');
              }}
              className={`${styles.text_input} theme-body-medium`}
            />
            {errors.zipCode?.type === 'required' && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
            {errors.zipCode?.type === 'pattern' && (
              <span className={`${styles.error} theme-body-small`}>
                Invalid Zip Code, should be in the format XXXXX-XXXX or XXXXX
              </span>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </form>
  );
};

export default General;

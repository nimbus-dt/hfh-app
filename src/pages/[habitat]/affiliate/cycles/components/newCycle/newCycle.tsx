import { type SubmitHandler, useForm } from 'react-hook-form';
import { DataStore } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';
import { throttle } from 'lodash';
import dayjs from 'dayjs';

import Modal from 'components/Modal';
import { Habitat, TestCycle } from 'models';

import styles from './newCycle.module.css';

interface NewCycleProps {
  formId?: string;
  open: boolean;
  close: () => void;
  openCycle?: TestCycle;
  habitat?: Habitat;
  refetch: () => void;
}

interface Inputs {
  name: string;
}

const NewCycle = ({
  open,
  close,
  openCycle,
  habitat,
  refetch,
  formId,
}: NewCycleProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onCloseCycle = async () => {
    if (openCycle) {
      const originalOpenCycle = await DataStore.query(TestCycle, openCycle.id);
      if (originalOpenCycle) {
        await DataStore.save(
          TestCycle.copyOf(originalOpenCycle, (original) => {
            original.isOpen = false;
            original.endDate = dayjs().format('YYYY-MM-DD');
          })
        );
        refetch();
        close();
      }
    }
  };
  const onCreateCycle: SubmitHandler<Inputs> = async (data) => {
    if (habitat && formId) {
      await DataStore.save(
        new TestCycle({
          name: data.name,
          startDate: new Date().toISOString(),
          isOpen: true,
          habitatID: habitat.id,
          form: formId,
        })
      );
      refetch();
      close();
    }
  };
  return (
    <Modal
      title={openCycle ? 'Close Application Cycle' : 'Create Application Cycle'}
      open={open}
      onClickClose={close}
    >
      {openCycle ? (
        <div className={styles.background}>
          <p className="theme-subtitle-s2">
            Are you sure you want to close your current application cycle?
          </p>
          <p className="theme-body-medium">
            Once closed, applicants can no longer submit applications to your
            form.
          </p>
          <div className={styles.buttons}>
            <Button
              variation="destructive"
              onClick={throttle(onCloseCycle, 500)}
            >
              Confirm
            </Button>
            <Button variation="link" onClick={throttle(close, 500)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <form
          className={styles.background}
          onSubmit={throttle(handleSubmit(onCreateCycle), 500)}
        >
          <label
            htmlFor="name"
            className={`${styles.text_label} theme-body-medium`}
          >
            Please enter a name for your new application cycle below
            <input
              type="name"
              id="name"
              {...register('name', { required: true })}
              className={`${styles.text_input} theme-body-medium`}
            />
            {errors.name && (
              <span className={`${styles.error} theme-body-small`}>
                This field is required
              </span>
            )}
          </label>
          <div className={styles.buttons}>
            <Button variation="link" onClick={throttle(close, 500)}>
              Cancel
            </Button>
            <Button variation="primary" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default NewCycle;

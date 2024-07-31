import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { DataStore } from 'aws-amplify/datastore';
import { Button } from '@aws-amplify/ui-react';
import { throttle } from 'lodash';
import dayjs from 'dayjs';
import Modal from 'components/Modal';
import { RootForm, TestCycle } from 'models';
import useHabitat from 'hooks/utils/useHabitat';
import styles from './newCycle.module.css';

interface NewCycleProps {
  open: boolean;
  close: () => void;
  openCycle?: TestCycle;
  refetch: () => void;
  rootForm: RootForm | null;
}

interface Inputs {
  name: string;
}

const NewCycle = ({
  open,
  close,
  openCycle,
  refetch,
  rootForm,
}: NewCycleProps) => {
  const { t } = useTranslation();
  const { habitat } = useHabitat();

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
    if (habitat && rootForm && rootForm.formUrls.length > 0) {
      await DataStore.save(
        new TestCycle({
          name: data.name,
          startDate: new Date().toISOString(),
          isOpen: true,
          rootformID: rootForm.id,
          closedCycleMessage:
            habitat.props.closedCycleMessages[
              habitat.props.closedCycleMessages.length - 1
            ],
          formUrl: rootForm.formUrls[rootForm.formUrls.length - 1],
        })
      );
      refetch();
      close();
    }
  };

  return (
    <Modal
      title={
        openCycle
          ? t(
              'pages.habitat.affiliate.cycles.components.newCycle.closeApplicationCycle'
            )
          : t(
              'pages.habitat.affiliate.cycles.components.newCycle.createApplicationCycle'
            )
      }
      open={open}
      onClickClose={close}
    >
      {openCycle ? (
        <div className={styles.background}>
          <p className="theme-subtitle-s2">
            {t(
              'pages.habitat.affiliate.cycles.components.newCycle.openCycle.title'
            )}
          </p>
          <p className="theme-body-medium">
            {t(
              'pages.habitat.affiliate.cycles.components.newCycle.openCycle.description'
            )}
          </p>
          <div className={styles.buttons}>
            <Button
              variation="destructive"
              onClick={throttle(onCloseCycle, 500)}
            >
              {t(
                'pages.habitat.affiliate.cycles.components.newCycle.openCycle.confirm'
              )}
            </Button>
            <Button variation="link" onClick={throttle(close, 500)}>
              {t(
                'pages.habitat.affiliate.cycles.components.newCycle.openCycle.cancel'
              )}
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
            {t(
              'pages.habitat.affiliate.cycles.components.newCycle.closeCycle.name'
            )}
            <input
              type="name"
              id="name"
              {...register('name', { required: true })}
              className={`${styles.text_input} theme-body-medium`}
            />
            {errors.name && (
              <span className={`${styles.error} theme-body-small`}>
                {t(
                  'pages.habitat.affiliate.cycles.components.newCycle.closeCycle.error'
                )}
              </span>
            )}
          </label>
          <div className={styles.buttons}>
            <Button variation="link" onClick={throttle(close, 500)}>
              {t(
                'pages.habitat.affiliate.cycles.components.newCycle.closeCycle.cancel'
              )}
            </Button>
            <Button variation="primary" type="submit">
              {t(
                'pages.habitat.affiliate.cycles.components.newCycle.closeCycle.confirm'
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default NewCycle;

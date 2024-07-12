import { useEffect, useRef, useState } from 'react';
import { usePostHog } from 'posthog-js/react';

import { formatHabitatCycleApplicationData } from 'utils/formatters';

import { Header, Footer, Loading } from 'components';
import { DataStore } from 'aws-amplify';
import { TestApplication } from 'models';
import getPage from './utils/getPage';

import FormLayoutProps from './FormLayout.types';
import styles from './FormLayout.module.css';

const FormLayout = ({
  formReady,
  habitat,
  children,
  application,
  cycle,
}: FormLayoutProps) => {
  const posthog = usePostHog();

  const [currentPage, setCurrentPage] = useState(0);
  const pages = getPage(formReady);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formReady) {
      const setPageAsync = async () => {
        await formReady.setPage(application?.lastPage || 0);
        setCurrentPage(application?.lastPage || 0);
      };
      setPageAsync();
    }
  }, [application?.lastPage, formReady]);

  const handleGoBack = async () => {
    headerRef.current?.scrollIntoView();

    if (application) {
      const currentApplication = await DataStore.query(TestApplication, (c1) =>
        c1.id.eq(application.id)
      );

      if (currentApplication) {
        await DataStore.save(
          TestApplication.copyOf(currentApplication[0], (original) => {
            original.lastPage = Number(currentPage - 1);
          })
        );
      }
    }

    setCurrentPage((prev) => prev - 1);

    formReady
      .prevPage()
      .then(() => {
        posthog?.capture(
          `form_previous_from_page_${currentPage + 1}_to_page_${currentPage}`,
          formatHabitatCycleApplicationData({
            habitat,
            cycle,
            application,
          })
        );
      })
      .catch((error: unknown) => {
        console.log(error);
        posthog?.capture(
          `form_previous_error_from_page_${
            currentPage + 1
          }_to_page_${currentPage}`,
          formatHabitatCycleApplicationData({
            habitat,
            cycle,
            application,
            error,
          })
        );
      });
  };

  const handleGoNext = async () => {
    headerRef.current?.scrollIntoView();

    if (
      formReady?.componentComponents &&
      currentPage === formReady.componentComponents.length - 1
    ) {
      if (application) {
        const currentApplication = await DataStore.query(
          TestApplication,
          (c1) => c1.id.eq(application.id)
        );

        if (currentApplication) {
          await DataStore.save(
            TestApplication.copyOf(currentApplication[0], (original) => {
              original.lastPage = Number(currentPage - 1);
            })
          );
        }

        setCurrentPage(0);
      }

      formReady
        .submit()
        .then(() => {
          posthog?.capture(
            `form_submit_from_page_${currentPage + 1}`,
            formatHabitatCycleApplicationData({
              habitat,
              cycle,
              application,
            })
          );
        })
        .catch((error: unknown) => {
          posthog?.capture(
            `form_submit_error_from_page_${currentPage + 1}`,
            formatHabitatCycleApplicationData({
              habitat,
              cycle,
              application,
              error,
            })
          );
        });
      return;
    }
    setCurrentPage((prev) => prev + 1);
    formReady
      .nextPage()
      .then(() => {
        posthog?.capture(
          `form_next_from_page_${currentPage + 1}_to_page_${currentPage + 2}`,
          formatHabitatCycleApplicationData({
            habitat,
            cycle,
            application,
          })
        );
      })
      .catch((error: unknown) => {
        posthog?.capture(
          `form_next_error_from_page_${currentPage + 1}_to_page_${
            currentPage + 2
          }`,
          formatHabitatCycleApplicationData({
            habitat,
            cycle,
            application,
            error,
          })
        );
        setCurrentPage((prev) => prev - 1);
      });
  };

  const submit =
    formReady?.componentComponents &&
    currentPage === formReady.componentComponents.length - 1;

  return (
    <div className={styles.layout}>
      {!formReady && <Loading />}
      {formReady && (
        <div ref={headerRef}>
          <Header current={currentPage} pages={pages} />
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {formReady && (
        <div className={styles.footer}>
          <Footer
            goBack={currentPage === 0 ? undefined : handleGoBack}
            onNext={handleGoNext}
            submit={submit}
          />
        </div>
      )}
    </div>
  );
};

export default FormLayout;

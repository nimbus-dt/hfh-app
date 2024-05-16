import styles from './ProgressBar.module.css';

interface PageProps {
  section: string;
  step: number;
  number: number;
}

type PagesProps = PageProps[];

type FilteredSteps = {
  step: number;
  section: string;
  pages: PagesProps;
}[];

interface IProperties {
  current: number;
  pages: PagesProps;
}

const filterByUniqueSteps = (pages: PagesProps) => {
  const filteredSteps: FilteredSteps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    const stepIndex = filteredSteps.findIndex(
      (step) => step.step === page.step
    );

    if (stepIndex === -1) {
      filteredSteps.push({
        section: page.section,
        step: page.step,
        pages: [{ ...page }],
      });
    } else {
      filteredSteps[stepIndex].pages = [
        ...filteredSteps[stepIndex].pages,
        { ...page },
      ];
    }
  }

  return filteredSteps;
};

const ProgressBar = ({ current, pages }: IProperties) => {
  const steps = filterByUniqueSteps(pages);
  const currentPage = pages[current];
  const currentStep = steps.find((step) => step.step === currentPage.step);
  const findCurrentStepIndex =
    currentStep?.pages.findIndex(
      (page) => page.number === currentPage.number
    ) || 0;
  const length = currentStep?.pages.length || 1;
  const width = 110.5 / length;
  const rightCurrentWidth = width * findCurrentStepIndex;
  const leftCurrentWidth = 110.5 - rightCurrentWidth;
  let finished = false;
  return (
    <div className={styles.background}>
      <ul
        className={styles.container}
        style={{ maxWidth: `${146.5 * steps.length}px` }}
      >
        {steps.map(({ step, section }, index) => {
          const first = index === 0;
          const last = index === steps.length - 1;
          const colored = finished;
          if (currentStep?.step === step) {
            finished = true;
          }
          return (
            <li className={styles.step} key={index}>
              <div>
                {!first && (
                  <div
                    className={styles.line}
                    style={{
                      width: `${leftCurrentWidth}px`,
                      height: '2px',
                      left: `${55.25 - leftCurrentWidth}px`,
                      backgroundColor: `${colored ? '#BDBDBD' : '#325CCA'}`,
                    }}
                  />
                )}
                <p
                  className={styles.circle}
                  style={{
                    color: `${finished ? '#325CCA' : '#FFFDFD'}`,
                    backgroundColor: `${finished ? '#FFFDFD' : '#325CCA'}`,
                    borderColor: `${finished ? '#325CCA' : '#325CCA'}`,
                  }}
                >
                  {step}
                </p>
                {!last && (
                  <div
                    className={styles.line}
                    style={{
                      width: `${rightCurrentWidth}px`,
                      background: `${colored ? '#BDBDBD' : '#325CCA'}`,
                      height: '2px',
                      left: '91.25px',
                    }}
                  />
                )}
              </div>
              <p
                className={`${styles.section} theme-body-medium`}
                style={{ color: `${colored ? '#BDBDBD' : '#325CCA'}` }}
              >
                {section}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProgressBar;

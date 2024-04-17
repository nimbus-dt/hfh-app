import { Components } from 'formiojs';
import { isElement } from 'utils/type';
import { getCheckOrExEmoji } from 'utils/misc';
import { FormAnswer, TestApplication } from 'models';
import { DataStore } from 'aws-amplify';
import style from './CustomContainer.module.css';

const saveSection = async ({
  data,
  application,
  page,
  section,
}: {
  data: unknown;
  application: TestApplication;
  page: string;
  section: string;
}) => {
  try {
    const persistedFormAnswer = await DataStore.query(FormAnswer, (c1) =>
      c1.and((c2) => {
        const criteriaArray = [
          c2.testapplicationID.eq(application.id),
          c2.page.eq(page),
          c2.section.eq(section),
        ];

        return criteriaArray;
      })
    );

    if (persistedFormAnswer.length > 0) {
      const response = await DataStore.save(
        FormAnswer.copyOf(persistedFormAnswer[0], (original) => {
          original.values = JSON.stringify(data);
        })
      );
      console.log('update response', response);
    } else {
      const response = await DataStore.save(
        new FormAnswer({
          testapplicationID: application.id,
          page,
          section,
          values: JSON.stringify(data),
        })
      );
      console.log('save response', response);
    }
    return true;
  } catch (error) {
    return false;
  }
};

class CustomContainer extends Components.components.container {
  __expanded?: boolean;

  __editing = false;

  __completed = false;

  async __isPersisted(
    application: TestApplication,
    page: string,
    section: string
  ) {
    try {
      const persistedFormAnswer = await DataStore.query(FormAnswer, (c1) =>
        c1.and((c2) => {
          const criteriaArray = [
            c2.testapplicationID.eq(application.id),
            c2.page.eq(page),
            c2.section.eq(section),
          ];

          return criteriaArray;
        })
      );

      if (persistedFormAnswer.length > 0) {
        this.__completed = true;
        this.__expanded = false;
        this.disabled = true;
        this.triggerRedraw();
      } else {
        this.__completed = false;
        this.disabled = false;
      }
    } catch (error) {
      console.log('Error retrieving form answer', error);
      this.__completed = false;
    }
  }

  init(): void {
    super.init();
    const { expandable, expanded } = this.component.properties;
    if (expandable) {
      this.__expanded = expanded === 'true';
      if ('path' in this && typeof this.path === 'string') {
        const path = this.path.split('.');
        const page = path[0];
        const section = path[1];
        const { application } = this.options.additional;
        this.__isPersisted(application, page, section);
      }
    }
  }

  render(children: unknown) {
    const { expandable, title } = this.component.properties;
    if (expandable && this.visible) {
      return `
      <div ref="__container" class="${style.container}">
        <div ref="__titleContainer" class="${style.title_container}">
          <div>
            <span>${getCheckOrExEmoji(this.__completed)}</span>
            <span>${title}</span>
          </div>
          <button ref="__expand_button">${
            this.__expanded ? '🔼' : '🔽'
          }</button>
        </div>
        <div ref="__childrenContainer" class="${style.children_container} ${
        !this.__expanded ? style.contracted : ''
      }">
          ${super.render(children)}
          <div>
          ${
            !this.__completed || this.__editing
              ? '<button ref="__save_button">Save</button>'
              : '<button ref="__edit_button">Edit</button>'
          }
            ${
              this.__editing
                ? '<button ref="__cancel_button">Cancel</button>'
                : ''
            }
          </div>
        </div>
      </div>
    `;
    }
    return super.render(children);
  }

  attach(element: unknown) {
    const { expandable } = this.component.properties;
    if (expandable) {
      this.loadRefs(element, {
        __container: 'single',
        __titleContainer: 'single',
        __expand_button: 'single',
        __childrenContainer: 'single',
        __save_button: 'single',
        __edit_button: 'single',
        __cancel_button: 'single',
      });
      if (
        '__expand_button' in this.refs &&
        isElement(this.refs.__expand_button)
      ) {
        this.refs.__expand_button.addEventListener('click', () => {
          this.__expanded = !this.__expanded;
          this.triggerRedraw();
        });
      }
      if ('__save_button' in this.refs && isElement(this.refs.__save_button)) {
        this.refs.__save_button.addEventListener('click', async () => {
          if ('path' in this && typeof this.path === 'string') {
            const path = this.path.split('.');
            const page = path[0];
            const section = path[1];
            const { application } = this.options.additional;
            const data = this.data[section];
            if (this.__checkValidityWithoutCompleted(data)) {
              // persist data
              this.__completed = await saveSection({
                page,
                section,
                application,
                data,
              });
              this.__editing = !this.__completed;
              this.__expanded = !this.__completed;
              this.disabled = true;
              // try to expand the next container
              if (this.__completed) {
                const currentIndex = this.parent.components.findIndex(
                  (component2: unknown) =>
                    typeof component2 === 'object' &&
                    component2 &&
                    'id' in component2 &&
                    component2.id === this.id
                );

                for (let i = 0; i < this.parent.components.length; i += 1) {
                  if (i > currentIndex) {
                    if (
                      this.parent.components[i]._visible &&
                      this.parent.components[i].type === 'container'
                    ) {
                      this.parent.components[i].__expand();
                      break;
                    }
                  }
                }
              }
            } else {
              // TODO show errors
              console.log('this', this);
            }
          }
          this.triggerRedraw();
        });
      }

      if ('__edit_button' in this.refs && isElement(this.refs.__edit_button)) {
        this.refs.__edit_button.addEventListener('click', async () => {
          this.__editing = true;
          this.disabled = false;
          this.triggerRedraw();
        });
      }

      if (
        '__cancel_button' in this.refs &&
        isElement(this.refs.__cancel_button)
      ) {
        this.refs.__cancel_button.addEventListener('click', async () => {
          this.__editing = false;
          this.disabled = true;
          this.triggerRedraw();
        });
      }
    }
    return super.attach(element);
  }

  __checkValidityWithoutCompleted(data: unknown) {
    return super.checkValidity(data, undefined);
  }

  checkValidity(data: unknown, dirty: unknown) {
    const { expandable } = this.component.properties;
    if (expandable) {
      return this.__completed && super.checkValidity(data, dirty);
    }
    return super.checkValidity(data, dirty);
  }

  __expand() {
    this.__expanded = true;
    this.triggerRedraw();
  }
}

export default CustomContainer;

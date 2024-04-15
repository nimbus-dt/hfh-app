import { Components } from 'formiojs';
import './CustomContainer.style.css';
import { isElement } from 'utils/type';

class CustomContainer extends Components.components.container {
  __expanded?: boolean;

  init(): void {
    super.init();
    const { expandable, expanded } = this.component.properties;
    if (expandable) {
      this.__expanded = expanded === 'true';
    }
  }

  render(children: unknown) {
    const { expandable, title, expanded } = this.component.properties;
    if (expandable) {
      return `
      <div ref="__container" class="customContainer-container">
        <div ref="__titleContainer" class="customContainer-titleContainer">
          <span>${title}</span>
          <button ref="__button">${expanded === 'true' ? '🔼' : '🔽'}</button>
        </div>
        <div ref="__childrenContainer" class="customContainer-childrenContainer ${
          expanded !== 'true' ? 'contracted' : ''
        }">
          ${super.render(children)}
        </div>
      </div>
    `;
    }
    return super.render(children);
  }

  attach(element: unknown) {
    super.attach(element);
    const { expandable } = this.component.properties;
    if (expandable) {
      this.loadRefs(element, {
        __container: 'single',
        __titleContainer: 'single',
        __button: 'single',
        __childrenContainer: 'single',
      });
      if ('__button' in this.refs && isElement(this.refs.__button)) {
        this.refs.__button.addEventListener('click', (event) => {
          if (
            '__childrenContainer' in this.refs &&
            isElement(this.refs.__childrenContainer)
          ) {
            this.refs.__childrenContainer.classList.toggle('contracted');
            this.__expanded = !this.__expanded;
            if (event.currentTarget && 'innerText' in event.currentTarget) {
              event.currentTarget.innerText = this.__expanded ? '🔼' : '🔽';
            }
          }
        });
      }
    }
  }
}

export default CustomContainer;

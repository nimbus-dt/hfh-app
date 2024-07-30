import { Components } from 'formiojs';
import { isElement } from 'utils/type';

class CustomFile extends Components.components.file {
  __hfhImgObserver: MutationObserver | null = null;

  init() {
    this.__hfhImgObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const image = mutation.target;
        if (image instanceof HTMLImageElement) {
          const aElement = document.createElement('a');
          aElement.href = image.src;
          aElement.target = '_blank';
          aElement.innerText = image.alt;
          aElement.classList.add('hfh_formio_file_link');
          image.replaceWith(aElement);
        }
      }
    });

    return super.init();
  }

  attach(element: unknown) {
    this.__hfhImgObserver?.disconnect();
    if (isElement(element)) {
      const videoContainer = element.querySelector('div.video-container');
      if (videoContainer && videoContainer instanceof HTMLElement) {
        const video = element.querySelector('video.video');

        if (video && video instanceof HTMLVideoElement) {
          video.addEventListener('loadeddata', (event) => {
            if (videoContainer && event.target instanceof HTMLVideoElement) {
              videoContainer.style.width = `${
                event.target?.clientWidth || 0
              }px`;
              videoContainer.style.height = `${
                event.target.clientHeight || 0
              }px`;
            }
          });
        }
      }

      const images = element.querySelectorAll('img');

      for (const image of images) {
        if (image instanceof HTMLImageElement) {
          this.__hfhImgObserver?.observe(image, { attributes: true });
        }
      }
    }

    return super.attach(element);
  }

  detach() {
    this.__hfhImgObserver?.disconnect();
    return super.detach();
  }

  browseFiles(attrs = {}) {
    if ('accept' in attrs) {
      attrs.accept = this.component.filePattern.trim() || '';
    }

    return super.browseFiles(attrs);
  }

  getVideoStream(constraints: MediaTrackConstraints) {
    return super.getVideoStream({ facingMode: 'environment', ...constraints });
  }
}

declare module 'formiojs/types/components/_classes/field/field' {
  interface Field {
    browseFiles(attrs?: object): Promise<unknown>;
    getVideoStream(constraints: MediaTrackConstraints): Promise<MediaStream>;
  }
}

export default CustomFile;

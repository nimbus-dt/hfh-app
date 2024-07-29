import { Components } from 'formiojs';
import { isElement } from 'utils/type';

class CustomFile extends Components.components.file {
  attach(element: unknown) {
    console.log(element);
    if (isElement(element)) {
      const videoContainer = element.querySelector('div.video-container');

      if (videoContainer && videoContainer instanceof HTMLElement) {
        const div = document.createElement('div');

        div.classList.add('hfh_formio_file_video_frame');

        videoContainer.classList.add('hfh_formio_file_video_container');

        videoContainer.appendChild(div);

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

          video.classList.add('hfh_formio_file_video');
        }
      }

      const images = element.querySelectorAll('img');

      for (const image of images) {
        if (image instanceof HTMLImageElement) {
          image.addEventListener('error', () => {
            const aElement = document.createElement('a');
            aElement.href = image.src;
            aElement.target = '_blank';
            aElement.innerText = image.alt;
            aElement.classList.add('hfh_formio_file_link');
            image.replaceWith(aElement);
          });
        }
      }

      const takePictureButton = element.querySelector(
        'button[ref="takePictureButton"]'
      );

      const switchToFileUploadButton = element.querySelector(
        'button[ref="toggleCameraMode"]'
      );

      if (
        takePictureButton &&
        takePictureButton instanceof HTMLButtonElement &&
        switchToFileUploadButton &&
        switchToFileUploadButton instanceof HTMLButtonElement
      ) {
        const div = document.createElement('div');
        div.classList.add('hfh_formio_file_camera_buttons');
        element.insertBefore(div, takePictureButton);
        div.appendChild(takePictureButton);
        div.appendChild(switchToFileUploadButton);
      }
    }

    return super.attach(element);
  }

  browseFiles(attrs = {}) {
    console.log(attrs);
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

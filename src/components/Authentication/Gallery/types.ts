interface GalleryProps {
  data: {
    id: string;
    image: string;
    title: string;
    message: string;
  }[];
  habitat?: string;
}

export default GalleryProps;

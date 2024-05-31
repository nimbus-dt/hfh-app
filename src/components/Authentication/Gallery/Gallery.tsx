import { useState, useEffect } from 'react';
import GalleryProps from './types';
import styles from './styles.module.css';

const Gallery = ({ data }: GalleryProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [current, data]);

  const handleClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={styles.background}>
      <img
        className={styles.image}
        alt={data[current].title}
        src={data[current].image}
      />
      <h2 className={`${styles.title} theme-subtitle-s1`}>
        {data[current].title}
      </h2>
      <p className={`${styles.message} theme-body-small`}>
        {data[current].message}
      </p>
      <div className={styles.pagination}>
        {data.map((element, index) => (
          <button
            key={element.id}
            onClick={() => handleClick(index)}
            type="button"
            className={`${styles.button} ${
              current === index
                ? styles['button-active']
                : styles['button-inactive']
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

import React from 'react';
import style from './FormSections.module.css';

interface IProperties {
  current: number;
  sections: string[];
}

const FormSections = ({ current, sections }: IProperties) => (
  <div className={`${style.container}`}>
    {sections.map((section, index) => (
      <div key={index} className={`${style.section}`}>
        <div className={`${style.graphicContainer}`}>
          <div
            className={`${style.line} ${index === 0 ? style.invisible : ''}`}
          />
          <div className={`${style.numberContainer}`}>
            <span className={`${style.number}`}>{index + 1}</span>
          </div>
          <div
            className={`${style.line} ${
              index + 1 === sections.length ? style.invisible : ''
            }`}
          />
        </div>
        <div className={style.sectionContainer}>
          <span>{section}</span>
        </div>
      </div>
    ))}
  </div>
);

export default FormSections;

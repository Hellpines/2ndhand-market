import React from 'react';
import style from './Breadcrumbs.module.css';

const formatLabel = (text) => {
  if (!text) return '';
  return text
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function Breadcrumbs({
  activeDepartment,
  activeCategory,
  onResetAll,
  onSelectDepartment,
}) {
  return (
    <nav className={style.breadcrumbs}>
      <button type="button" className={style.link} onClick={onResetAll}>
        Home
      </button>

      {activeDepartment && (
        <>
          <span className={style.separator}>›</span>
          {activeCategory ? (
            <button
              type="button"
              className={style.link}
              onClick={() => onSelectDepartment(activeDepartment)}
            >
              {formatLabel(activeDepartment)}
            </button>
          ) : (
            <span className={style.current}>
              {formatLabel(activeDepartment)}
            </span>
          )}
        </>
      )}

      {activeCategory && activeCategory !== 'all' && (
        <>
          <span className={style.separator}>›</span>
          <span className={style.current}>
            {formatLabel(activeCategory)}
          </span>
        </>
      )}
    </nav>
  );
}
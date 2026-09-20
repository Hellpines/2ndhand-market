import React, { useState, useRef, useEffect } from 'react';
import style from './FilterBar.module.css';
import DismissIcon from '../../assets/dismiss.svg';
import ArrowIcon from '../../assets/arrow.svg';

export default function FilterBar({
  filters = {},
  onChangeFilters,
  sortBy,
  onChangeSort,
  availableOptions = {
    colors: [],
    sizes: [],
    brands: [],
    shops: [],
    conditions: ['New', 'Used'],
  },
  activeCategory,
  onSelectCategory,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (field, value) => {
    onChangeFilters({ category: field, value });
  };

  const handleRemoveFilter = (field) => {
    onChangeFilters({ category: field, clear: true });
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const filterConfigs = [
    { key: 'colors', label: 'Color', options: availableOptions.colors || [] },
    { key: 'sizes', label: 'Size', options: availableOptions.sizes || [] },
    { key: 'brands', label: 'Brand', options: availableOptions.brands || [] },
    { key: 'conditions', label: 'Condition', options: availableOptions.conditions || ['New', 'Used'] },
    { key: 'shops', label: 'Shop', options: availableOptions.shops || [] },
  ];

  return (
    <div className={style.container} ref={dropdownRef}>
      <div className={style.dropdownsRow}>
        {filterConfigs.map(({ key, label, options }) => {
          const selectedValues = filters[key] || [];
          const isOpen = openDropdown === key;

          return (
            <div key={key} className={style.dropdownWrapper}>
              <button
                type='button'
                className={`${style.select} ${selectedValues.length > 0 ? style.activeSelect : ''}`}
                onClick={() => toggleDropdown(key)}
                aria-expanded={isOpen}
                aria-controls={`filter-${key}`}
                aria-label={`Toggle ${label} filter`}
              >
                <span>{label}</span> <ArrowIcon className={`${style.arrow} ${isOpen ? style.arrowUp : ''}`} />
              </button>

              {isOpen && (
                <div className={style.dropdownMenu} id={`filter-${key}`} role='group' aria-label={`${label} filter options`}>
                  {options.map((option) => (
                    <label key={option} className={style.checkboxOption}>
                      <input
                        type='checkbox'
                        checked={selectedValues.includes(option)}
                        onChange={() => handleToggleOption(key, option)}
                        aria-label={`Filter by ${label}: ${option}`}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button
          type='button'
          className={`${style.saleBtn} ${filters.isSale ? style.saleActive : ''}`}
          onClick={() => onChangeFilters('isSale')}
          aria-label={filters.isSale ? 'Disable sale filter' : 'Enable sale filter'}
          aria-pressed={Boolean(filters.isSale)}
        >
          <p className={style.saleBtnText}>Sale</p>
          {filters.isSale && <DismissIcon className={style.dismissIcon} />}
        </button>
      </div>

      <div className={style.chipsRow}>
        {activeCategory && activeCategory !== 'all' && (
          <span className={style.chip}>
            {activeCategory}{' '}
            <button
              type='button'
              onClick={() => onSelectCategory && onSelectCategory(null)}
              className={style.chipRemove}
              aria-label={`Remove ${activeCategory} category filter`}
            >
              <DismissIcon className={style.dismissIcon} />
            </button>
          </span>
        )}

        {filterConfigs.map(({ key }) => {
          const val = filters[key];
          if (!val || !Array.isArray(val) || val.length === 0) return null;

          return (
            <span key={key} className={style.chip}>
              {val.join(', ')}{' '}
              <button
                type='button'
                onClick={() => handleRemoveFilter(key)}
                className={style.chipRemove}
                aria-label={`Remove ${key} filter`}
              >
                <DismissIcon className={style.dismissIcon} />
              </button>
            </span>
          );
        })}
      </div>

      <div className={style.sortRow}>
        <span className={style.sortLabel}>Sort by:</span>
        <button
          type='button'
          className={`${style.sortBtn} ${sortBy === 'asc' ? style.activeSort : ''}`}
          onClick={() => onChangeSort(sortBy === 'asc' ? null : 'asc')}
          aria-label='Sort products by ascending price'
          aria-pressed={sortBy === 'asc'}
        >
          Ascending price
        </button>
        <button
          type='button'
          className={`${style.sortBtn} ${sortBy === 'desc' ? style.activeSort : ''}`}
          onClick={() => onChangeSort(sortBy === 'desc' ? null : 'desc')}
          aria-label='Sort products by descending price'
          aria-pressed={sortBy === 'desc'}
        >
          Descending price
        </button>
      </div>
    </div>
  );
}
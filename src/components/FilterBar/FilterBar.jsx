import React from 'react';
import style from './FilterBar.module.css';
import DismissIcon from '../../assets/dismiss.svg';

export default function FilterBar({
  filters,
  onChangeFilters,
  sortBy,
  onChangeSort,
  availableOptions = { colors: [], sizes: [], brands: [] },
}) {
  const handleSelectChange = (field, value) => {
    onChangeFilters({ ...filters, [field]: value });
  };

  const handleRemoveFilter = (field) => {
    const updated = { ...filters };
    delete updated[field];
    onChangeFilters(updated);
  };

  return (
    <div className={style.container}>
      <div className={style.dropdownsRow}>
        <select
          value={filters.color || ''}
          onChange={(e) => handleSelectChange('color', e.target.value)}
          className={style.select}
        >
          <option value="">Color</option>
          {availableOptions.colors.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filters.size || ''}
          onChange={(e) => handleSelectChange('size', e.target.value)}
          className={style.select}
        >
          <option value="">Size</option>
          {availableOptions.sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={filters.brand || ''}
          onChange={(e) => handleSelectChange('brand', e.target.value)}
          className={style.select}
        >
          <option value="">Brand</option>
          {availableOptions.brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={filters.condition || ''}
          onChange={(e) => handleSelectChange('condition', e.target.value)}
          className={style.select}
        >
          <option value="">Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>

        <button
          type="button"
          className={`${style.saleBtn} ${filters.isSale ? style.saleActive : ''}`}
          onClick={() => handleSelectChange('isSale', !filters.isSale)}
        >
          <p className={style.saleBtnText}>Sale</p>
          {filters.isSale && <DismissIcon className={style.dismissIcon} />}
        </button>
      </div>

      <div className={style.chipsRow}>
        {Object.entries(filters).map(([key, val]) => {
          if (!val || key === 'isSale') return null;
          return (
            <span key={key} className={style.chip}>
              {String(val)}{' '}
              <button
                type="button"
                onClick={() => handleRemoveFilter(key)}
                className={style.chipRemove}
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
          type="button"
          className={`${style.sortBtn} ${sortBy === 'asc' ? style.activeSort : ''}`}
          onClick={() => onChangeSort(sortBy === 'asc' ? null : 'asc')}
        >
          Ascending price
        </button>
        <button
          type="button"
          className={`${style.sortBtn} ${sortBy === 'desc' ? style.activeSort : ''}`}
          onClick={() => onChangeSort(sortBy === 'desc' ? null : 'desc')}
        >
          Descending price
        </button>
      </div>
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { useGetCategoriesTreeQuery } from '../../services/productsApi';
import { DEPARTMENT_MAP } from '../../constants/categories';
import style from './Sidebar.module.css';

const ChevronIcon = React.memo(({ isOpen, color = '#2D3748' }) => (
  <svg
    className={`${style.arrow} ${isOpen ? style.open : ''}`}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

export default function Sidebar({ activeDepartment = 'new', activeCategory, onSelectCategory }) {
  const { data: categoryTree, isLoading } = useGetCategoriesTreeQuery();
  const [openSection, setOpenSection] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(null);

  const filteredTree = useMemo(() => {
    if (!categoryTree) return [];

    const allowedSlugs = activeDepartment ? DEPARTMENT_MAP[activeDepartment] : 'all';

    return categoryTree
      .map((group) => {
        const filteredSubcategories = group.subcategories
          ?.map((sub) => {
            const filteredItems =
              allowedSlugs === 'all'
                ? sub.items
                : sub.items.filter((item) => allowedSlugs.includes(item.slug));

            return { ...sub, items: filteredItems };
          })
          .filter((sub) => sub.items.length > 0);

        return { ...group, subcategories: filteredSubcategories };
      })
      .filter((group) => group.subcategories && group.subcategories.length > 0);
  }, [categoryTree, activeDepartment]);

  if (isLoading) return <aside className={style.sidebar}>Loading...</aside>;

  return (
    <aside className={style.sidebar}>
      <h2 className={style.title}>Categories</h2>
      <ul className={style.list}>
        {filteredTree.map((group) => {
          const isOpen = openSection === group.title;

          return (
            <li key={group.title} className={style.groupItem}>
              <button
                type="button"
                className={style.groupHeader}
                onClick={() => setOpenSection(isOpen ? null : group.title)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${group.title} category group`}
              >
                <span className={style.groupTitle}>{group.title}</span>
                <ChevronIcon isOpen={isOpen} />
              </button>

              {isOpen && (
                <ul className={style.subList}>
                  {group.subcategories.map((sub) => {
                    const isSubOpen = openSubSection === sub.title;

                    return (
                      <li key={sub.title} className={style.subGroupItem}>
                        <button
                          type="button"
                          className={style.subHeader}
                          onClick={() => setOpenSubSection(isSubOpen ? null : sub.title)}
                          aria-expanded={isSubOpen}
                          aria-label={`${isSubOpen ? 'Collapse' : 'Expand'} ${sub.title} subcategory`}
                        >
                          <span className={style.subTitle}>{sub.title}</span>
                          <ChevronIcon isOpen={isSubOpen} color="#718096" />
                        </button>

                        {isSubOpen && (
                          <ul className={style.itemList}>
                            {sub.items.map((item) => (
                              <li key={item.slug}>
                                <button
                                  type="button"
                                  className={`${style.itemBtn} ${
                                    activeCategory === item.slug ? style.active : ''
                                  }`}
                                  onClick={() => onSelectCategory(item.slug)}
                                  aria-pressed={activeCategory === item.slug}
                                >
                                  {item.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
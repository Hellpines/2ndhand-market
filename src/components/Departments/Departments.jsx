import style from './Departments.module.css';

const DEPARTMENTS = [
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'unisex', label: 'Unisex' },
  { id: 'children', label: 'Children' },
  { id: 'new', label: 'New' },
];

export default function Departments({ activeDepartment = 'new', onSelectDepartment }) {
  return (
    <div className={style.wrapper}>
      <nav className={style.container}>
        {DEPARTMENTS.map((dept) => {
          const isActive = activeDepartment === dept.id;
          return (
            <button
              key={dept.id}
              type="button"
              className={`${style.item} ${isActive ? style.active : ''}`}
              onClick={() => onSelectDepartment(dept.id)}
            >
              {dept.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
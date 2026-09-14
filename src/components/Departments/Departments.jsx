import { DEPARTMENTS } from '../../constants/departments';
import style from './Departments.module.css';

export default function Departments({ activeDepartment = null, onSelectDepartment }) {
  return (
    <div className={style.wrapper}>
      <nav className={style.container}>
        {DEPARTMENTS.map((dept) => {
          const isActive = activeDepartment === dept.id;

          const handleClick = () => {
            onSelectDepartment(isActive ? null : dept.id);
          };

          return (
            <button
              key={dept.id}
              type="button"
              className={`${style.item} ${isActive ? style.active : ''}`}
              onClick={handleClick}
            >
              {dept.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
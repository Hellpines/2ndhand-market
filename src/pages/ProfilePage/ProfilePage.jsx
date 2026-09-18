import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import style from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/slices/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className={style.page}>
      <Header />
      <main className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>User Profile</h1>

          <div className={style.infoGroup}>
            <div className={style.infoRow}>
              <span className={style.label}>Full Name:</span>
              <span className={style.value}>{user.name || 'Not specified'}</span>
            </div>
            <div className={style.infoRow}>
              <span className={style.label}>Email:</span>
              <span className={style.value}>{user.email}</span>
            </div>
          </div>

          <button onClick={handleLogout} className={style.logoutBtn}>
            Log Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
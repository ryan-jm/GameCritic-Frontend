import { useNavigate } from 'react-router-dom';

import Hero from '../components/Common/Hero';
import { useAuth } from '../stores/AuthContext';

const Home = () => {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  return <>{!isAuthed ? <Hero /> : navigate('/dashboard')}</>;
};

export default Home;

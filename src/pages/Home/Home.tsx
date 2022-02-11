import { useNavigate } from 'react-router-dom';

import Hero from '../../components/Home/Hero';
import { useAuth } from '../../contexts/Auth/AuthContext';

const Home = () => {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  return <>{!isAuthed ? <Hero /> : navigate('/dashboard')}</>;
};

export default Home;

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    history.push('/login');
  }, [history]);

  return null;
};

export default Logout;

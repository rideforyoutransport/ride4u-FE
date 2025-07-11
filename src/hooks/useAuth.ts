import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/authSlice';
import { authService } from '../services';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());
      const response = await authService.login({ email, password });
      
      if (response.success) {
        const authUser = {
          id: response.result.id,
          token: response.result.token,
          email: email,
        };
        
        dispatch(loginSuccess(authUser));
        toast.success('Login successful!');
        navigate(ROUTES.DASHBOARD);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(message));
      toast.error(message);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const response = await authService.changePassword({
        oldPassword,
        newPassword,
        newPasswordConfirm: newPassword
      });
      
      if (response.success) {
        toast.success('Password changed successfully');
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Password change failed';
      toast.error(message);
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate(ROUTES.LOGIN);
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: handleLogout,
    changePassword,
  };
};

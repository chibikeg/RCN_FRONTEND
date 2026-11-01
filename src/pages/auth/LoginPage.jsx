import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FormField, Alert, Spinner } from '../../components/ui';
import { useForm } from '../../hooks';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { values, errors, handleChange, setErrors } = useForm({
    email: '',
    password: '',
  });

  const validate = () => {
    const newErrors = {};
    if (!values.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = 'Enter a valid email address';
    if (!values.password) newErrors.password = 'Password is required';
    else if (values.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(values.email, values.password);
      // Redirect based on role
      const adminRoles = ['ADMIN', 'SUPER_ADMIN', 'PASTOR', 'DEPARTMENT_HEAD', 'WORKER'];
      if (adminRoles.includes(user.role)) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard/profile');
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials helper
  const fillDemo = (role) => {
    const creds = {
      admin: { email: 'admin@church.org', password: 'Password123!' },
      pastor: { email: 'pastor@church.org', password: 'Password123!' },
      member: { email: 'alice@church.org', password: 'Password123!' },
    };
    const c = creds[role];
    handleChange({ target: { name: 'email', value: c.email } });
    handleChange({ target: { name: 'password', value: c.password } });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Visual Panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">RCN</span>
            </div>
            <span className="text-white font-semibold">Remnant Christian Network</span>
          </Link>
        </div>
        <div className="relative z-10 max-w-md">
          <blockquote className="text-white text-2xl font-display italic leading-relaxed mb-4">
            "Come to me, all who labour and are heavy laden, and I will give you rest."
          </blockquote>
          <p className="text-white/60 text-sm">Matthew 11:28</p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">RCN</span>
              </div>
              <span className="font-semibold text-primary">Remnant Christian Network</span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to access your member portal</p>

          {/* Demo Quick-Login */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-blue-700 mb-2">🔐 Demo Credentials (Development)</p>
            <div className="flex gap-2 flex-wrap">
              {['admin', 'pastor', 'member'].map((role) => (
                <button
                  key={role}
                  onClick={() => fillDemo(role)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {apiError && (
            <Alert type="error" className="mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              required
            />

            <FormField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              required
            >
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`input-base pr-11 ${errors.password ? 'border-red-300' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                )}
              </div>
            </FormField>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-accent focus:ring-accent" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-accent hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
              id="login-submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

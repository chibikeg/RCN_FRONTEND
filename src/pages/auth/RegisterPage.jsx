import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FormField, SelectField, Alert, Spinner } from '../../components/ui';
import { useForm } from '../../hooks';
import { GENDER_OPTIONS } from '../../constants';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const { values, errors, handleChange, setErrors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    const errs = {};
    if (!values.firstName.trim()) errs.firstName = 'First name is required';
    if (!values.lastName.trim()) errs.lastName = 'Last name is required';
    if (!values.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = 'Enter a valid email';
    if (!values.password) errs.password = 'Password is required';
    else if (values.password.length < 8)
      errs.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[A-Z])/.test(values.password))
      errs.password = 'Password must contain an uppercase letter';
    else if (!/(?=.*\d)/.test(values.password))
      errs.password = 'Password must contain a number';
    if (values.confirmPassword !== values.password)
      errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await register({
        email: values.email,
        password: values.password,
        profile: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          gender: values.gender || undefined,
        },
      });
      setSuccess(true);
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-primary mb-3">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for joining Remnant Christian Network. Please check your email to verify your account before signing in.
          </p>
          <Link to="/login" className="btn-primary">
            Proceed to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative"
        style={{
          backgroundImage: 'url(/community-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">RCN</span>
            </div>
            <span className="text-white font-semibold">Remnant Christian Network</span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Become Part of the Remnant
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            Join thousands of believers from around the world striving toward the rebirth of Apostolic Christianity.
          </p>
          <div className="space-y-3">
            {[
              'Access exclusive sermon content',
              'Connect with global RCN community',
              'Stay updated on events & conferences',
              'Submit prayer requests & testimonies',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-white/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xs">RCN</span>
              </div>
              <span className="font-semibold text-primary text-sm">Remnant Christian Network</span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm mb-8">Fill in your details to join our community</p>

          {apiError && (
            <Alert type="error" className="mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="John"
                required
              />
              <FormField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Doe"
                required
              />
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+234 800 000 0000"
              />
              <SelectField
                label="Gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                error={errors.gender}
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </SelectField>
            </div>

            <FormField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Min 8 characters"
              required
            >
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters, 1 uppercase, 1 number"
                  className={`input-base pr-11 ${errors.password ? 'border-red-300' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
              </div>
            </FormField>

            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Re-enter your password"
              required
            />

            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 rounded text-accent focus:ring-accent" />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="text-accent hover:underline">Terms of Use</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
              id="register-submit"
            >
              {loading ? (
                <><Spinner size="sm" /> Creating Account...</>
              ) : (
                <><UserPlus className="w-5 h-5" /> Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

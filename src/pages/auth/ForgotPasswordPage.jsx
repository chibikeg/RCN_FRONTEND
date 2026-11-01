import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { authAPI } from '../../services/api';
import { FormField, Alert, Spinner } from '../../components/ui';
import { useForm } from '../../hooks';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const { values, errors, handleChange, setErrors } = useForm({ email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!values.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    setLoading(true);
    try {
      await authAPI.forgotPassword(values.email);
      setSuccess(true);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
            <Mail className="w-7 h-7 text-accent" />
          </div>

          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="font-display text-2xl font-bold text-primary mb-3">Check Your Email</h1>
              <p className="text-gray-500 text-sm mb-6">
                If an account exists for <strong>{values.email}</strong>, we've sent password reset instructions.
              </p>
              <Link to="/login" className="btn-primary w-full justify-center">
                Return to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-primary mb-2">Forgot Password?</h1>
              <p className="text-gray-500 text-sm mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {apiError && (
                <Alert type="error" className="mb-5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{apiError}</span>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                  {loading ? <><Spinner size="sm" /> Sending...</> : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

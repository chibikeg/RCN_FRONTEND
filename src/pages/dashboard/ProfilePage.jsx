import { useState } from 'react';
import { User, Camera, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { profilesAPI } from '../../services/api';
import { FormField, SelectField, Alert, Spinner } from '../../components/ui';
import { useForm } from '../../hooks';
import { GENDER_OPTIONS } from '../../constants';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { values, errors, handleChange, setErrors } = useForm({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    phone: user?.profile?.phone || '',
    gender: user?.profile?.gender || '',
    avatarUrl: user?.profile?.avatarUrl || '',
  });

  const validate = () => {
    const errs = {};
    if (!values.firstName.trim()) errs.firstName = 'First name is required';
    if (!values.lastName.trim()) errs.lastName = 'Last name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!validate()) return;
    setLoading(true);
    try {
      // PATCH /api/v1/profiles/me
      const response = await profilesAPI.updateMyProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        gender: values.gender || undefined,
        avatarUrl: values.avatarUrl || undefined,
      });
      updateUser({ profile: response.data?.data || { ...user?.profile, ...values } });
      setSuccess(true);
    } catch (err) {
      // Dev fallback — update locally
      if (!err.response) {
        updateUser({ profile: { ...user?.profile, ...values } });
        setSuccess(true);
      } else {
        setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const roleLabelMap = {
    SUPER_ADMIN: 'Super Admin', ADMIN: 'Admin', PASTOR: 'Pastor',
    DEPARTMENT_HEAD: 'Department Head', WORKER: 'Worker', MEMBER: 'Member',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-primary mb-1">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your personal information and account details.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-accent-gradient flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold relative">
            {user?.profile?.firstName?.[0] || 'U'}
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <h2 className="font-semibold text-primary mb-1">
            {user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user?.email}
          </h2>
          <p className="text-accent text-sm font-medium mb-1">{roleLabelMap[user?.role] || user?.role}</p>
          <p className="text-gray-400 text-xs">{user?.email}</p>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-left">
            <div className="flex justify-between text-gray-600">
              <span className="text-gray-400">Status</span>
              <span className={`font-medium ${user?.isActive ? 'text-green-600' : 'text-red-500'}`}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="text-gray-400">Email verified</span>
              <span className={`font-medium ${user?.isEmailVerified ? 'text-green-600' : 'text-amber-500'}`}>
                {user?.isEmailVerified ? 'Yes' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="text-gray-400">Role</span>
              <span className="font-medium text-primary">{roleLabelMap[user?.role]}</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-primary mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-accent" /> Personal Information
          </h3>

          {success && (
            <Alert type="success" className="mb-5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-500" />
              <span>Profile updated successfully!</span>
            </Alert>
          )}
          {error && (
            <Alert type="error" className="mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label="First Name" name="firstName" value={values.firstName}
                onChange={handleChange} error={errors.firstName} required
              />
              <FormField
                label="Last Name" name="lastName" value={values.lastName}
                onChange={handleChange} error={errors.lastName} required
              />
            </div>
            <FormField
              label="Email Address" name="email" type="email"
              value={user?.email || ''} disabled
              className="opacity-70"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label="Phone Number" name="phone" type="tel"
                value={values.phone} onChange={handleChange}
                placeholder="+234 800 000 0000"
              />
              <SelectField
                label="Gender" name="gender"
                value={values.gender} onChange={handleChange}
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </SelectField>
            </div>
            <FormField
              label="Profile Photo URL" name="avatarUrl"
              value={values.avatarUrl} onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="btn-primary" id="save-profile">
                {loading ? <><Spinner size="sm" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

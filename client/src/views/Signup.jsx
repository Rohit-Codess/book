import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Phone, Chrome } from 'lucide-react';

const Signup = () => {
  const [signupMethod, setSignupMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    };
  };

  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name must be at least 2 characters and contain only letters';
    }

    // Last Name validation
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name must be at least 2 characters and contain only letters';
    }

    // Email or Mobile validation
    if (signupMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!validateMobile(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
      }
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Signup data:', { ...formData, signupMethod, agreeTerms });
      // Handle successful signup here
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup initiated');
    // Implement Google OAuth here
  };

  const getPasswordStrength = () => {
    const validation = validatePassword(formData.password);
    let score = 0;
    if (validation.minLength) score++;
    if (validation.hasUpperCase) score++;
    if (validation.hasLowerCase) score++;
    if (validation.hasNumbers) score++;
    if (validation.hasSpecialChar) score++;

    if (score < 2) return { strength: 'Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score < 4) return { strength: 'Medium', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    return { strength: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 text-blue-600 hover:text-blue-700 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Book World</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
          <p className="text-gray-600">Join our book community</p>
        </div>

        {/* Signup Method Toggle */}
        <div className="mb-6">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setSignupMethod('email')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                signupMethod === 'email'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => setSignupMethod('mobile')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                signupMethod === 'mobile'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>Mobile</span>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email or Mobile Input */}
          {signupMethod === 'email' ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          ) : (
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+91</span>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="9876543210"
                  maxLength="10"
                />
              </div>
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            </div>
          )}
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength().bgColor}`}
                      style={{ width: `${(getPasswordStrength().strength === 'Weak' ? 33 : getPasswordStrength().strength === 'Medium' ? 66 : 100)}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${getPasswordStrength().color}`}>
                    {getPasswordStrength().strength}
                  </span>
                </div>
              </div>
            )}
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          
          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          
          {/* Terms Agreement */}
          <div>
            <label className="flex items-start">
              <input 
                type="checkbox" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className={`mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                  errors.terms ? 'border-red-500' : ''
                }`} 
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms and Conditions</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Chrome className="h-5 w-5 text-red-500" />
          <span className="text-gray-700">Continue with Google</span>
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

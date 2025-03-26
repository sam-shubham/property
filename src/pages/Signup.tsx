import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, Menu, ArrowRight, User, Check, Phone, X
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AuthHeader } from '../components/AuthHeader';
import { Footer } from '../components/Footer';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const Signup = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('buyer');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface UserProfile {
    fullName: string;
    email: string;
    phone: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
  }

  interface FirebaseError {
    code: string;
    message: string;
  }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Form validation
      if (!fullName || !email || !password || !confirmPassword) {
        setErrorMessage('Please fill in all required fields');
        return;
      }
      
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long');
        return;
      }
      
      if (!agreeToTerms) {
        setErrorMessage('You must agree to the Terms of Service');
        return;
      }
      
      try {
        setLoading(true);
        setErrorMessage('');
        
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save user profile data to Firestore
        const userData: UserProfile = {
          fullName,
          email,
          phone,
          userType,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', user.uid), userData);
        
        // Redirect to login page or dashboard
        navigate('/login');
        
      } catch (error) {
        console.error('Error during signup:', error);
        
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered. Please use a different email or login instead.');
        } else if (firebaseError.code === 'auth/invalid-email') {
          setErrorMessage('Please enter a valid email address.');
        } else if (firebaseError.code === 'auth/weak-password') {
          setErrorMessage('Password is too weak. Please use a stronger password.');
        } else {
          setErrorMessage('An error occurred during registration. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <AuthHeader />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join PropertyPrime to find your dream property</p>
            </div>
            
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-center text-sm">
                <X className="h-4 w-4 mr-2" />
                {errorMessage}
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* User Type Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">I am a:</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'buyer', label: 'Buyer' },
                    { id: 'seller', label: 'Seller' },
                    { id: 'agent', label: 'Agent' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        userType === type.id
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          : 'bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100'
                      }`}
                      onClick={() => setUserType(type.id)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <form onSubmit={handleSignup}>
                <div className="space-y-5">
                  {/* Full Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long with numbers and special characters
                    </p>
                  </div>
                  
                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirm-password">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                  
                  {/* Signup Button */}
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full py-3" 
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Create Account <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                  
                  {/* Social Signups */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-sm text-gray-500">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700">
                  Log in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
interface AdminAuth {
    isAdmin: boolean;
    token: string;
}

interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
}

const handleLogin = (e: LoginFormEvent): void => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
        setError('Please fill in all fields');
        return;
    }
    
    // This is a mock authentication - in a real app, you would call an API
    if (email === 'admin@example.com' && password === 'admin123') {
        // Store admin token/session
        localStorage.setItem('adminAuth', JSON.stringify({ 
            isAdmin: true, 
            token: 'mock-jwt-token' 
        } as AdminAuth));
        
        navigate('/admin');
    } else {
        setError('Invalid email or password');
    }
};
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-xl font-bold">PropertyPrime</h1>
          <p className="text-indigo-200 text-sm">Admin Login</p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                Log in to Admin Panel
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              For demo: Email: admin@example.com, Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
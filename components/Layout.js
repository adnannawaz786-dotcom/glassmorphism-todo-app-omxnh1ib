import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Plus, Settings, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Plus, label: 'Add', href: '#add' },
    { icon: Settings, label: 'Settings', href: '#settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
                <h1 className="text-xl font-bold text-white">TodoGlass</h1>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden backdrop-blur-xl bg-white/5 border-t border-white/10 overflow-hidden"
              >
                <div className="container mx-auto px-4 py-4">
                  <nav className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.a>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Main Content Area */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>

        {/* Bottom Navigation for Mobile */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="md:hidden sticky bottom-0 backdrop-blur-xl bg-white/10 border-t border-white/20 safe-area-pb"
        >
          <div className="flex items-center justify-around py-3 px-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-white/60 hover:text-white transition-colors min-w-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Glassmorphism Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default Layout;
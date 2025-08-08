import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function LoadingSpinner({ 
  size = 'md', 
  className, 
  text = 'Loading...',
  showText = true,
  variant = 'default'
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const variants = {
    default: 'border-white/30 border-t-white',
    primary: 'border-blue-200/30 border-t-blue-400',
    accent: 'border-purple-200/30 border-t-purple-400'
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3",
      className
    )}>
      {/* Glassmorphism Container */}
      <div className="relative">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
        
        {/* Spinning Border */}
        <motion.div
          className={cn(
            "relative rounded-full border-2 border-transparent",
            sizeClasses[size],
            variants[variant]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner Glow Effect */}
        <motion.div
          className={cn(
            "absolute inset-1 rounded-full bg-gradient-to-tr from-white/20 to-transparent",
            "opacity-50"
          )}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Text */}
      {showText && (
        <motion.p
          className={cn(
            "text-white/80 font-medium tracking-wide",
            textSizeClasses[size]
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${40 + i * 10}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Overlay Loading Spinner for full-screen loading
export function LoadingOverlay({ isVisible, text = 'Loading...', onClose }) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <LoadingSpinner size="lg" text={text} variant="primary" />
        
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/30"
          animate={{
            borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Inline Loading Spinner for buttons
export function ButtonSpinner({ className }) {
  return (
    <motion.div
      className={cn(
        "w-4 h-4 border-2 border-white/30 border-t-white rounded-full",
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}
export const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  flicker = false, // new prop to enable flickering
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-semibold transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ' +
    'select-none';

  const variants = {
    default:
      'bg-emerald-600 text-white shadow-md ' +
      'hover:bg-emerald-700 hover:shadow-lg ' +
      'focus-visible:ring-emerald-400 ' +
      'active:scale-95 active:shadow-sm',
    outline:
      'border border-emerald-600 text-emerald-600 bg-transparent ' +
      'hover:bg-emerald-50 hover:text-emerald-700 ' +
      'focus-visible:ring-emerald-400 ' +
      'active:scale-95 active:bg-emerald-100',
  };

  const sizes = {
    md: 'h-10 px-6 text-base',
    sm: 'h-8 px-4 text-sm',
    lg: 'h-12 px-8 text-lg',
  };

  // Add flicker animation class if flicker=true
  const flickerClass = flicker ? 'animate-flicker' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${
        sizes[size] || sizes.md
      } ${flickerClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

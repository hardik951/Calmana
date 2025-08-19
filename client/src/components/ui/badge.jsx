export const Badge = ({ children, className = '', variant = 'default', animation = false, ...props }) => {
  const baseStyles = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium select-none transition-colors duration-200';

  const variants = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    destructive: 'bg-red-100 text-red-800 hover:bg-red-200',
    secondary: 'bg-gray-200 text-gray-600 hover:bg-gray-300',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  };

  const animationClass = animation ? 'animate-flicker' : '';

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.default} ${animationClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

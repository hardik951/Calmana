export const Badge = ({ children, className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    secondary: 'bg-gray-200 text-gray-600',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </span>
  );
};
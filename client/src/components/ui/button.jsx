export const Button = ({ children, className, variant = 'default', size = 'md', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-700',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900',
  };
  const sizes = {
    md: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
  };
  return (
    <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`} {...props}>
      {children}
    </button>
  );
};
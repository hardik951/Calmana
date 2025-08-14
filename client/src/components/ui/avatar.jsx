export const Avatar = ({ children, className }) => <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}>{children}</div>;
export const AvatarFallback = ({ children, className }) => <span className={`flex items-center justify-center text-sm font-medium ${className}`}>{children}</span>;
export const AvatarImage = ({ src, className, alt }) => <img src={src} alt={alt} className={`object-cover ${className}`} />;

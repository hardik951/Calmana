export const Card = ({ children, className }) => <div className={`bg-white rounded-lg border ${className}`}>{children}</div>;
export const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
export const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
export const CardHeader = ({ children, className }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
export const CardTitle = ({ children, className }) => <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
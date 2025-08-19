export const Card = ({ children, className }) => (
  <div
    className={`bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 bg-[length:300%_300%] animate-gradient-shift rounded-lg border border-white/20 shadow-md ${className}`}
  >
    {children}
  </div>
);
export const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
export const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-700 ${className}`}>{children}</p>
);
export const CardHeader = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
export const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

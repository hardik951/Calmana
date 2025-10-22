<<<<<<< HEAD
import * as React from "react"

import { cn } from "../../lib/utils" // <-- Make sure this path is correct

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// ===== THIS IS THE MISSING PIECE =====
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
// ======================================

export { 
  Card, 
  CardHeader, 
  CardFooter, // <-- Added to the export
  CardTitle, 
  CardDescription, 
  CardContent 
}
=======
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
>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4

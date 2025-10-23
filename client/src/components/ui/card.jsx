import * as React from "react";
import { cn } from "../../lib/utils"; // Make sure this path is correct

// --- Card Base ---
const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-white/20 shadow-md bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 bg-[length:300%_300%] animate-gradient-shift text-card-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

// --- Card Sub-Components ---
const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

// --- Export All ---
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

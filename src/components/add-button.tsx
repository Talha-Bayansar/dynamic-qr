import { PlusCircle } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { forwardRef } from "react";

export const AddButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Button ref={ref} className={className} {...rest}>
        <PlusCircle className={"mr-2 h-4 w-4"} />
        {children}
      </Button>
    );
  }
);

AddButton.displayName = "AddButton";

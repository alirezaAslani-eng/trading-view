import Button from "@/components/ui/Button/Button";
import { useFormControl } from "@mui/material";
import { ComponentProps } from "react";

function SubmitButton(props: ComponentProps<typeof Button>) {
  const formState = useFormControl();
  return (
    <Button
      disabled={props.disabled || formState?.disabled}
      variant="contained"
      color="primary"
      size="large"
      type="submit"
      fullWidth
      {...props}
    />
  );
}

export default SubmitButton;

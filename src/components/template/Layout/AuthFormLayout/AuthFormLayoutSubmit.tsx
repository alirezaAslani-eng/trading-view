import Button from "@/components/ui/Button/Button";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { ButtonProps } from "@mui/material";

function AuthFormLayoutSubmit(props: ReplaceSxWithSxOnlyObject<ButtonProps>) {
  return (
    <Button
      {...props}
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      sx={{ mt: { xs: "20px", sm: "30px" }, ...props.sx }}
    />
  );
}

export default AuthFormLayoutSubmit;

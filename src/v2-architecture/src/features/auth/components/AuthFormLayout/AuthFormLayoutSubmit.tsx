import { ReplaceSxWithSxOnlyObject } from "@/v2-architecture/src/design-system";
import { Button } from "@/v2-architecture/src/shared/ui";
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

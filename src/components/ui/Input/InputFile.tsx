import {
  ComponentProps,
  forwardRef,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";
import {
  alpha,
  Box,
  Stack,
  styled,
  Typography,
  useFormControl,
} from "@mui/material";
import clsx from "clsx";
import { UploadFileIcon } from "../Icon";

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const HiddenInput = styled("input")({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

const FakeInputUI = styled(Stack)(({ theme }) => {
  const { palette, typography } = theme;
  return {
    justifyContent: "center",
    minHeight: "150px",
    padding: theme.spacing(4, 3),
    borderRadius: "10px",
    border: `1px dashed ${theme.palette.border.secondary}`,
    color: theme.palette.border.secondary,
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: alpha(theme.palette.background.inputModal!, 0.22),
    transition: theme.transitions.create([
      "border-color",
      "color",
      "background-color",
    ]),

    "&.Mui-error": {
      borderColor: theme.palette.text.error,
      color: theme.palette.text.error,
    },

    "&.Mui-disabled": {
      cursor: "not-allowed",
      color: theme.palette.text.disabled,
      borderColor: theme.palette.action.disabledBackground,
      backgroundColor: theme.palette.action.disabledBackground,
    },
    //#region // * ------------ Children ------------
    "& .upload-icon": {
      color: palette.text.linkSecondary,
    },
    "& .input-label": {
      color: palette.text.linkSecondary,
      ...typography.body3,
    },
    //#endregion // * ------------ Children ------------
  };
});

interface InputFileProps extends Omit<ComponentProps<"input">, "type"> {
  error?: boolean;
  label?: string;
}
const InputFile = (props: InputFileProps) => {
  const {
    error,
    onChange,
    label = "فایل خود را آپلود کنید",
    ref,
    ...rest
  } = props;

  const formState = useFormControl();

  const disabled = props.disabled || formState?.disabled;

  const innerRef = useRef<HTMLInputElement>(null);

  const [fileNames, setFileNames] = useState<string[]>([]);

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) ref.current = node;
  };

  const handleFakeUIClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    innerRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const names = Array.from(selectedFiles).map((file) => file.name);
      setFileNames(names);
    } else {
      setFileNames([]);
    }

    onChange?.(event);
  };

  return (
    <Box>
      <HiddenInput
        ref={setRefs}
        type="file"
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />

      <FakeInputUI
        className={clsx({ "Mui-error": error, "Mui-disabled": disabled })}
        onClick={handleFakeUIClick}
      >
        <Stack sx={{ alignItems: "center", gap: "28px" }}>
          {!!!fileNames.length && (
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <UploadFileIcon className="upload-icon" />
              <Typography className="input-label">{label}</Typography>
            </Stack>
          )}
          {!!fileNames.length && (
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              {fileNames.map((name) => {
                return (
                  <Typography key={name} className="input-label">
                    {name}
                  </Typography>
                );
              })}
            </Stack>
          )}
        </Stack>
      </FakeInputUI>
    </Box>
  );
};

export default InputFile;

import {
  forwardRef,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";
import { Box, styled } from "@mui/material";
import clsx from "clsx";

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

const FakeInputUI = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
    borderRadius: "10px",
    minHeight: "144px",
    border: `1px dashed ${theme.palette.border.secondary}`,
    color: theme.palette.border.secondary,
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: theme.palette.background.inputModal,
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
  };
});

const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { error, disabled, onClick, onChange, ...rest } = props;
  const innerRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const handleFakeUIClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    innerRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const names = Array.from(selectedFiles).map((file) => file.name);
      setFileName(names.join("، "));
    } else {
      setFileName("");
    }

    onChange?.(event);
  };

  return (
    <Box>
      <HiddenInput
        ref={setRefs}
        type="file"
        disabled={disabled}
        onClick={onClick}
        onChange={handleChange}
        {...rest}
      />

      <FakeInputUI
        className={clsx({ "Mui-error": error, "Mui-disabled": disabled })}
        onClick={handleFakeUIClick}
      >
        <span>{fileName || "انتخاب فایل"}</span>
      </FakeInputUI>
    </Box>
  );
});

export default InputFile;
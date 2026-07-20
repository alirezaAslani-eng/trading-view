import { TextareaSizeProps, TextareaSizeReturn } from "./types";

function textareaSize({ size }: TextareaSizeProps): TextareaSizeReturn {
  const sizes = {
    // * ------- medium size -------
    medium: {
      rootSize: {
        minHeight: "110px",
        resize: "none",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    } satisfies TextareaSizeReturn,
    // * ------- small size -------
    small: {
      rootSize: {
        minHeight: "110px",
        resize: "none",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    } satisfies TextareaSizeReturn,
  };

  //@ts-ignore
  const style = sizes?.[size] as TextareaSizeReturn | undefined;

  return style || sizes.medium;
}

export default textareaSize;

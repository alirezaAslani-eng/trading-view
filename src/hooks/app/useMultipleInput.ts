import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { UseMultipleInputConfig } from "@/hooks/app/types";
import { v4 as uuidv4 } from "uuid";
const useMultipleInput = ({
  inputCount,
  onComplete = () => {},
  onChange = () => {},
}: UseMultipleInputConfig) => {
  const [multiInputValues, setMultiInputValues] = useState<string[]>([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState<number>(0);

  /**
   * Switch between prev and next input by its value and current index
   */
  const prevNext = useCallback(
    (inputVal: string, inputIndex: number) => {
      if (inputVal) setFocusedInputIndex(Math.min(inputIndex + 1, inputCount));
      else setFocusedInputIndex(Math.max(inputIndex - 1, 0));
    },
    [setFocusedInputIndex]
  );

  /**
   * When user fills all inputs, it calls the onComplete function
   */
  const completeHandler = useEffectEvent((multiInputValues: string[]) => {
    const serilizedValue = multiInputValues.join("");
    if (serilizedValue.length !== inputCount) return;
    onComplete(serilizedValue);
  });

  /**
   * When user updates inputs, it calls the onChange function
   */
  const changeHandler = useEffectEvent((multiInputValues: string[]) => {
    const serilizedValue = multiInputValues.join("");
    onChange(serilizedValue);
  });

  /**
   * This Listener minus the state "focusedInputIndex" only when user press backspace key on an empty input
   */
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key != "Backspace") return;
      const target = e.target;
      // @ts-ignore
      if (target?.role != "single-char-input") return;
      // @ts-ignore
      if (target?.value) return;
      e.preventDefault(); // * preventd backspace behavior because it applies on prev input
      // @ts-ignore
      prevNext("", Number(target.id)); // * only prev of empty input
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [prevNext]);

  /**
   * Update parent state
   */
  useEffect(() => {
    completeHandler(multiInputValues);
    changeHandler(multiInputValues);
  }, [multiInputValues]);

  /**
   * While user types, this function updates each index of multiInputValues
   */
  const updateSingleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = e.target.value;
    setMultiInputValues((prev) => {
      const array = [...prev];
      array[index] = value[0]?.trim();
      return array;
    });
  };

  const register = (index: number) => {
    return {
      onChange: (e) => {
        updateSingleInput(e, index);
        prevNext(e.target.value, index);
      },
      onFocus: (e) => {
        setFocusedInputIndex(Number(e.target.id));
      },
      value: multiInputValues[index] || "",
      id: String(index),
      role: "single-char-input",
      autoFocus: focusedInputIndex === index,
      maxLength: 2,
    } satisfies InputHTMLAttributes<HTMLInputElement>;
  };

  const getKey = (index: number): string => {
    return index === focusedInputIndex ? uuidv4() : uuidv4();
  };

  const setSerializedValue = useCallback(
    (value: string) => {
      const multirized = value.split("").slice(0, inputCount);
      setMultiInputValues(multirized);
    },
    [setMultiInputValues, inputCount]
  );

  return {
    register,
    getKey,
    setSerializedValue,
    multiInputValues,
  };
};

export default useMultipleInput;

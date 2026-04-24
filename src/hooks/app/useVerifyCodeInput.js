import { useCallback, useEffect, useState } from "react";

const useMultipleInput = ({
  inputCount,
  onComplete = () => {},
  onChange = () => {},
}) => {
  const [multiInputValues, setMultiInputValues] = useState([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);
  /**
   * Switch between prev and next input by its value and current index
   */
  const prevNext = useCallback(
    (inputVal, inputIndex) => {
      if (inputVal) setFocusedInputIndex(Math.min(inputIndex + 1, inputCount));
      else setFocusedInputIndex(Math.max(inputIndex - 1, 0));
    },
    [setFocusedInputIndex],
  );
  /**
   * When user fills all inputs, it calls the onComplete function
   */
  const completeHandler = (multiInputValues) => {
    const serilizedValue = multiInputValues.join("");
    if (serilizedValue.length !== inputCount) return;
    onComplete(serilizedValue);
  };
  /**
   * When user updates inputs, it calls the onChange function
   */
  const changeHandler = (multiInputValues) => {
    const serilizedValue = multiInputValues.join("");
    onChange(serilizedValue);
  };
  /**
   * This Listener minus the state "focusedInputIndex" only when user press backspace key on an empty input
   */
  useEffect(() => {
    const listener = (e) => {
      if (e.key != "Backspace") return;
      const target = e.target;
      if (target?.role != "single-char-input") return;
      if (target.value) return;
      e.preventDefault(); // * preventd backspace behavior because it applies on prev input
      prevNext("", Number(target.id)); // * only prev of empty input
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [prevNext]);
  /**
   * While user types, this function updates each index of multiInputValues
   */
  const updateSingleInput = (e, index) => {
    const value = e.target.value;
    setMultiInputValues((prev) => {
      const array = [...prev];
      array[index] = value[0]?.trim();
      completeHandler(array);
      changeHandler(array);
      return array;
    });
  };

  const register = (index) => {
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
    };
  };

  const getKey = (index) => {
    return index === focusedInputIndex
      ? crypto.randomUUID()
      : crypto.randomUUID();
  };

  const setSerializedValue = useCallback(
    (value) => {
      const multirized = value.split("").slice(0, inputCount);
      setMultiInputValues(multirized);
    },
    [setMultiInputValues],
  );

  return {
    register,
    getKey,
    setSerializedValue,
    multiInputValues,
  };
};

export default useMultipleInput;

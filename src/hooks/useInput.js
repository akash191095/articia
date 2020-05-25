import { useState } from "react";

export const useInput = (initialValue, resetErrorOnChange) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  return {
    value,
    setValue,
    reset: () => setValue(""),
    setError,
    bind: {
      error: error ? true : false,
      helperText: error,
      value,
      onChange: (event) => {
        setValue(event.target.value);
        resetErrorOnChange && setError("");
      },
    },
  };
};

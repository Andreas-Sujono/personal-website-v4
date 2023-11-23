import { useState } from 'react';

export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<null | string>('');
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsDirty(true);

    // Resolve errors as soon as input becomes valid
    if (error && event.target.checkValidity()) {
      setError(null);
    }
  };

  const handleInvalid = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent native errors appearing
    event.preventDefault();
    setError(event.target.validationMessage);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only validate when the user has made a change
    if (isDirty) {
      event.target.checkValidity();
    }
  };

  return {
    value,
    error,
    onChange: handleChange,
    onBlur: handleBlur,
    onInvalid: handleInvalid,
  };
}

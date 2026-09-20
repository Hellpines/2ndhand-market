import { useCallback, useState } from 'react';

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return {
    formData,
    handleChange,
    resetForm,
    setFormData,
  };
}

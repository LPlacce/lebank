import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = ({ title, description, variant = "default" }) => {
    setToast({ title, description, variant, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  return {
    toast: showToast,
    currentToast: toast,
  };
}


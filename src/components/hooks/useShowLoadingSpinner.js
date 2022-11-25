import { useState } from "react";
import { toast } from "react-toastify";
const useShowLoadingSpinner = () => {
  const [loading, setLoading] = useState(false);

  return { loading, setLoading };
};

export default useShowLoadingSpinner;

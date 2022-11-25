import { toast } from "react-toastify";
const useShowNotification = () => {
  const showNotification = ({ type, message }) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return { showNotification };
};

export default useShowNotification;

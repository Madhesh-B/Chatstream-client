import { Toast } from "react-bootstrap";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../features/toastSlice";

const Toaster = () => {
  const dispatch = useDispatch();

  const { isOpen, message, type } = useSelector((state) => state.toast);

  return (
    <Toast
      show={isOpen}
      onClose={() => dispatch(hideToast())}
      delay={3000}
      autohide
      style={{ top: "20px", zIndex: 9999 }}
      className={`position-fixed end-0 m-3 ${type === "success" ? "bg-success" : "bg-danger"} text-white`}
    >
      <Toast.Body>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <div className="text-light">{message}</div>
          <X
            size={20}
            onClick={() => dispatch(hideToast())}
            style={{ cursor: "pointer" }}
          />
        </div>
      </Toast.Body>
    </Toast>
  );
};

export default Toaster;

import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2
        ${type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}
        animate-slide-in`}
      role="alert"
    >
      <span className="font-semibold">{type === "success" ? "Success!" : "Error!"}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white font-bold">&times;</button>
    </div>
  );
};

export default Toast;
"use client";
import { Provider } from "react-redux";
import store from "../../redux/store";

export default function ModalComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative z-40"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Background backdrop */}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            {children}
        </div>
      </div>
    </div>
  );
}

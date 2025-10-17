import React, { useEffect, useRef } from "react";
import { Modal } from "./Modal";

/**
 * A wrapper around the original Modal component to make it controllable from a parent.
 * It uses a hidden button that can be programmatically clicked.
 */
export function ControllableModal({
  children,
  isOpen,
  onClose,
  className = "",
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isProgrammaticClick = useRef(false);

  useEffect(() => {
    if (isOpen) {
      // Programmatically click the hidden trigger to open the modal
      isProgrammaticClick.current = true;
      triggerRef.current?.click();
    }
  }, [isOpen]);

  const handleOpenChange = () => {
    // If the modal was opened programmatically and is now being closed by the user,
    // call the onClose callback.
    if (isProgrammaticClick.current) {
      onClose();
      isProgrammaticClick.current = false;
    }
  };

  return (
    <div style={{ display: "none" }} onClick={handleOpenChange}>
        <Modal
            button={<button ref={triggerRef}></button>}
            className={className}
        >
            {children}
        </Modal>
    </div>
  );
}

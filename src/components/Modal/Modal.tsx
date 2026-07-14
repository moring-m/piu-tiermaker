import "./Modal.css";
import type { ReactNode } from "react";

interface ModalProps {

    open: boolean;

    title: string;

    children: ReactNode;

    onClose: () => void;

}

function Modal({

    open,

    title,

    children,

    onClose,

}: ModalProps) {

    if (!open) {

        return null;

    }

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;
import { useNavigate } from 'remix';
import { Portal } from './Portal'

interface props {
    children: React.ReactNode,
    isOpen: boolean,
    ariaLabel?: string,
    className?: string
}

export const Modal: React.FC<props> = ({ children, isOpen, ariaLabel, className }) => {
    const navigate = useNavigate()
    if (!isOpen) return null;
    return (
        <Portal wrapperId="modal">
            <div
                className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80"
                aria-labelledby={ariaLabel ?? " modal-title"}
                role="dialog"
                aria-modal="true"
                onClick={() => navigate(-1)}
            >
            </div>
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center">
                <div className={`${className} p-4 bg-gray-200 rounded-xl pointer-events-auto`}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
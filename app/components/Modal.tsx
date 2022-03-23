import { Portal } from './Portal'

interface props {
    children: React.ReactNode,
    isOpen: boolean,
    ariaLabel?: string
}

export const Modal: React.FC<props> = ({ children, isOpen, ariaLabel }) => {
    if (!isOpen) return null;
    return (
        <Portal wrapperId="modal">
            <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-600 bg-opacity-80" aria-labelledby={ariaLabel ?? "modal-title"} role="dialog" aria-modal="true">
                <div className="flex items-center justify-center h-full">
                    <div className="p-4 bg-gray-200 rounded-xl">
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
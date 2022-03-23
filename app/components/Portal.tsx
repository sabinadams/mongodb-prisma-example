// src/components/ReactPortal.js
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

interface props {
    children: React.ReactNode,
    wrapperId: string
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export const Portal: React.FC<props> = ({ children, wrapperId }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }

        setWrapperElement(element);

        return () => {
            // delete the programatically created element
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    // wrapperElement state will be null on very first render.
    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}
import { KeyboardEvent } from "react";

/**
 *
 * @param handler
 * @returns A function meant to be passed into the onKeyDown attribute of an input
 */
export const handleEnter = (handler: () => void) => {
    return (event: KeyboardEvent): void => {
        if (event.key === "Enter") {
            handler();
        }
    };
};

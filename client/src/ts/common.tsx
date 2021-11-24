import React from "react";
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

export const createRadioButtons = <T extends string | number>(
    values: { name: string; value: T }[],
    currentValue: T,
    setValue: (newValue: T) => void,
): JSX.Element[] => {
    return values.map(({ name, value }) => (
        <span key={`radio-button-${name}`}>
            <input
                id={`radio-button-${name}`}
                type="radio"
                value={value}
                checked={currentValue === value}
                onChange={() => setValue(value)}
            />
            <label htmlFor={`radio-button-${name}`}>{name}</label>
        </span>
    ));
};

export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export function padWithZeroes(num: number, size: number): string {
    let newNumber = num.toString();
    while (newNumber.length < size) newNumber = "0" + num;
    return newNumber;
}

const dollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
export const formatAsDollars = (amount: number): string => {
    return dollarFormatter.format(amount);
};

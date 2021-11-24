import React from "react";
import { Expense } from "../../../model";
import "./expense-row.less";

interface ExpenseRowProps {
    expense: Expense;
}
export const ExpenseRow = ({ expense }: ExpenseRowProps): JSX.Element => {
    return (
        <div className="expense-row">
            {expense.name}

            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
        </div>
    );
};

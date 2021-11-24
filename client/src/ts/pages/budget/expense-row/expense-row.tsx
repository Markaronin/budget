import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteExpenseMutationFunctions } from "../../../api-helper/query-helper";
import { CompleteExpense } from "../../../model";
import "./expense-row.less";

interface ExpenseRowProps {
    expense: CompleteExpense;
}
export const ExpenseRow = ({ expense }: ExpenseRowProps): JSX.Element => {
    const queryClient = useQueryClient();

    const deleteExpenseFns = deleteExpenseMutationFunctions(queryClient);
    const handleDeleteExpenseMutation = useMutation(deleteExpenseFns.fn, {
        ...deleteExpenseFns.options,
    });
    return (
        <div className="expense-row">
            {expense.name}

            <button className="edit">Edit</button>
            <button className="delete" onClick={() => handleDeleteExpenseMutation.mutate({ expenseId: expense.id })}>
                Delete
            </button>
        </div>
    );
};

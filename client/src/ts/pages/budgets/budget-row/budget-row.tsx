import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { deleteBudgetMutationFunctions } from "../../../api-helper/query-helper";
import { Budget } from "../../../model";
import "./budget-row.less";

interface BudgetRowProps {
    budget: Budget;
}
export const BudgetRow = ({ budget }: BudgetRowProps): JSX.Element => {
    const queryClient = useQueryClient();
    const deleteBudgetFns = deleteBudgetMutationFunctions(queryClient);
    const handleDeleteBudgetMutation = useMutation(deleteBudgetFns.fn, {
        ...deleteBudgetFns.options,
    });

    return (
        <div className="budget-row">
            <Link to={`/budgets/${budget.id}`} key={budget.id}>
                {budget.name}
            </Link>

            <button className="edit">Edit</button>
            <button className="delete" onClick={() => handleDeleteBudgetMutation.mutate({ budgetId: budget.id })}>
                Delete
            </button>
        </div>
    );
};

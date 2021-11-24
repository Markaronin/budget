import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { deleteBudgetMutationFunctions, editBudgetMutationFunctions } from "../../../api-helper/query-helper";
import { handleEnter } from "../../../common";
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
    const editBudgetFns = editBudgetMutationFunctions(queryClient);
    const handleEditBudgetMutation = useMutation(editBudgetFns.fn, {
        ...editBudgetFns.options,
    });

    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(budget.name);

    if (editing) {
        const finishEditing = () => {
            handleEditBudgetMutation.mutate({ budgetId: budget.id, data: { name: newName, users: budget.users } });
            setEditing(false);
        };
        return (
            <div className="budget-row">
                <input
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.currentTarget.value)}
                    onKeyDown={handleEnter(finishEditing)}
                    placeholder="name"
                />

                <button onClick={finishEditing}>Done</button>
            </div>
        );
    } else {
        return (
            <div className="budget-row">
                <Link to={`/budgets/${budget.id}`} key={budget.id}>
                    {budget.name}
                </Link>

                <button className="edit" onClick={() => setEditing(true)}>
                    Edit
                </button>
                <button className="delete" onClick={() => handleDeleteBudgetMutation.mutate({ budgetId: budget.id })}>
                    Delete
                </button>
            </div>
        );
    }
};

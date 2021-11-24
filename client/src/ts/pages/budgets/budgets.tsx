import { alertHelper } from "@markaronin/alert-helper";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { APIHelper } from "../../api-helper/api-helper";
import { createBudgetMutationFunctions } from "../../api-helper/query-helper";
import { getBalanceOfBudget } from "../../model";
import { BudgetRow } from "./budget-row/budget-row";
import { CreateBudgetWidget } from "./create-button-widget/create-budget-widget";

export const BudgetsPage = (): JSX.Element => {
    const { data: budgets, isError: budgetsLoadError } = useQuery("budgets", () =>
        APIHelper.listBudgets().then((response) => {
            if (response.success) {
                return response.budgets;
            } else {
                alertHelper.addAlert({ message: response.reason, severity: "error" });
                throw new Error();
            }
        }),
    );
    const { data: expenses, isError: expensesLoadError } = useQuery("expenses", () =>
        APIHelper.listExpenses().then((response) => {
            if (response.success) {
                return response.expenses;
            } else {
                alertHelper.addAlert({ message: response.reason, severity: "error" });
                throw new Error();
            }
        }),
    );

    const [creatingBudget, setCreatingBudget] = useState(false);

    const queryClient = useQueryClient();

    const createBudgetFns = createBudgetMutationFunctions(queryClient);
    const handleCreateBudgetMutation = useMutation(createBudgetFns.fn, {
        ...createBudgetFns.options,
    });

    if (budgets !== undefined && expenses !== undefined) {
        return (
            <div>
                {budgets
                    .sort((budget1, budget2) => budget1.name.localeCompare(budget2.name))
                    .map((budget) => (
                        <BudgetRow
                            budget={budget}
                            balance={getBalanceOfBudget(budget.id, budgets, expenses)}
                            key={budget.id}
                        />
                    ))}
                <hr />
                {creatingBudget ? (
                    <CreateBudgetWidget
                        handleCreateBudget={(newBudgetname) => {
                            handleCreateBudgetMutation.mutate({ budgetName: newBudgetname });
                            setCreatingBudget(false);
                        }}
                        handleCancel={() => setCreatingBudget(false)}
                    />
                ) : (
                    <button onClick={() => setCreatingBudget(true)}>Create new Budget</button>
                )}
            </div>
        );
    } else if (budgetsLoadError || expensesLoadError) {
        return <p>Error loading budgets or expenses</p>;
    } else {
        return <p>Loading budgets...</p>;
    }
};

import { alertHelper } from "@markaronin/alert-helper";
import { notUndefined } from "@markaronin/jefferson-util";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import { APIHelper } from "../../api-helper/api-helper";
import { editBudgetMutationFunctions } from "../../api-helper/query-helper";
import { ExpenseRow } from "./expense-row/expense-row";

interface BudgetPageProps extends RouteComponentProps<{ id: string }> {}
export const BudgetPage = ({ match }: BudgetPageProps): JSX.Element => {
    const queryClient = useQueryClient();

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

    const budgetId = match.params.id;

    const editBudgetFns = editBudgetMutationFunctions(queryClient);
    const handleEditBudgetMutation = useMutation(editBudgetFns.fn, {
        ...editBudgetFns.options,
    });

    if (budgets !== undefined && expenses !== undefined) {
        const budget = notUndefined(budgets.find((budget) => budget.id === budgetId));
        // TODO - remove
        handleEditBudgetMutation.data;
        return (
            <div>
                <h1>{budget.name}</h1>
                <h2>Income</h2>
                {expenses
                    .filter((expense) => expense.to === budgetId)
                    .map((expense) => (
                        <ExpenseRow key={expense.id} expense={expense} />
                    ))}
                <br />
                <button>Add new income</button>
                <h2>Expenses</h2>
                {expenses
                    .filter((expense) => expense.from === budgetId)
                    .map((expense) => (
                        <ExpenseRow key={expense.id} expense={expense} />
                    ))}
                <br />
                <button>Add new expense</button>
            </div>
        );
    } else if (budgetsLoadError || expensesLoadError) {
        return <p>Error loading budget</p>;
    } else {
        return <p>Loading budget...</p>;
    }
};

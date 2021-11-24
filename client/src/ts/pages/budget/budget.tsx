import { alertHelper } from "@markaronin/alert-helper";
import { notUndefined } from "@markaronin/jefferson-util";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import { APIHelper } from "../../api-helper/api-helper";
import { ExpenseCreator } from "./expense-creator/expense-creator";
import { ExpenseRow } from "./expense-row/expense-row";

interface BudgetPageProps extends RouteComponentProps<{ id: string }> {}
export const BudgetPage = ({ match }: BudgetPageProps): JSX.Element => {
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

    const [creatingIncome, setCreatingIncome] = useState(false);
    const [creatingExpense, setCreatingExpense] = useState(false);

    const budgetId = match.params.id;

    if (budgets !== undefined && expenses !== undefined) {
        const budget = notUndefined(budgets.find((budget) => budget.id === budgetId));
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
                {(creatingIncome && (
                    <ExpenseCreator
                        handleCancel={() => setCreatingIncome(false)}
                        currentBudgetId={budgetId}
                        isIncome={true}
                    />
                )) || <button onClick={() => setCreatingIncome(true)}>Add new income</button>}
                <h2>Expenses</h2>
                {expenses
                    .filter((expense) => expense.from === budgetId)
                    .map((expense) => (
                        <ExpenseRow key={expense.id} expense={expense} />
                    ))}
                <br />
                {(creatingExpense && (
                    <ExpenseCreator
                        handleCancel={() => setCreatingExpense(false)}
                        currentBudgetId={budgetId}
                        isIncome={false}
                    />
                )) || <button onClick={() => setCreatingExpense(true)}>Add new expense</button>}
            </div>
        );
    } else if (budgetsLoadError || expensesLoadError) {
        return <p>Error loading budgets or expenses</p>;
    } else {
        return <p>Loading budget...</p>;
    }
};

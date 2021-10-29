import { alertHelper } from "@markaronin/alert-helper";
import React from "react";
import { useQuery } from "react-query";
import { APIHelper } from "../../api-helper/api-helper";
import { BudgetRow } from "./budget-row/budget-row";

export const BudgetsPage = (): JSX.Element => {
    const {
        data: budgets,
        isError: budgetsLoadError,
        isFetching: isFetchingBudgets,
    } = useQuery("budgets", () =>
        APIHelper.listBudgets().then((response) => {
            if (response.success) {
                return response.budgets;
            } else {
                alertHelper.addAlert({ message: response.reason, severity: "error" });
                throw new Error();
            }
        }),
    );

    if (budgets !== undefined && !isFetchingBudgets) {
        return (
            <div>
                {budgets.map((budget) => (
                    <BudgetRow budget={budget} key={budget.id} />
                ))}
            </div>
        );
    } else if (budgetsLoadError) {
        return <p>Error loading budgets</p>;
    } else {
        return <p>Loading budgets...</p>;
    }
};

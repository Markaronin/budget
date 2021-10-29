import React from "react";
import { Link } from "react-router-dom";
import { Budget } from "../../../model";
import "./budget-row.less";

interface BudgetRowProps {
    budget: Budget;
}
export const BudgetRow = ({ budget }: BudgetRowProps): JSX.Element => {
    return (
        <div className="budget-row">
            <Link to={`/budgets/${budget.id}`} key={budget.id}>
                {budget.name}
            </Link>
        </div>
    );
};

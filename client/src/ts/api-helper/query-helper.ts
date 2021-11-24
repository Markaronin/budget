import { QueryClient } from "react-query";
import { Budget, Expense } from "../model";
import { APIHelper } from "./api-helper";
import {
    CreateBudgetResponse,
    CreateExpenseResponse,
    DeleteBudgetResponse,
    DeleteExpenseResponse,
    UnsuccessfulResponse,
    UpdateBudgetResponse,
    UpdateExpenseResponse,
} from "./response";

export const BUDGET_QUERY_CLIENT_KEY = "budgets";
export const EXPENSE_QUERY_CLIENT_KEY = "expenses";

type MutationFunctions<Var, Resp> = {
    fn: (variables: Var) => Promise<Resp>;
    options: {
        onMutate: (variables: Var) => void | Promise<unknown>;
        onSuccess?: (response: Resp, variables: Var) => void | Promise<unknown>;
        onSettled?: () => void | Promise<unknown>;
    };
};

export const createBudgetMutationFunctions = (
    queryClient: QueryClient,
): MutationFunctions<{ budgetName: string }, CreateBudgetResponse | UnsuccessfulResponse> => {
    return {
        fn: (variables) => APIHelper.createBudget({ name: variables.budgetName }),
        options: {
            onMutate: () => {
                queryClient.cancelQueries(BUDGET_QUERY_CLIENT_KEY);
            },
            onSuccess: (response, variables) => {
                const previousBudgets = queryClient.getQueryData<Budget[]>(BUDGET_QUERY_CLIENT_KEY);

                if (previousBudgets && response.success) {
                    queryClient.setQueryData<Budget[]>(BUDGET_QUERY_CLIENT_KEY, [
                        ...previousBudgets,
                        { id: response.id, name: variables.budgetName, users: [APIHelper.jwtPayload.data.id] },
                    ]);
                }
            },
        },
    };
};
export const editBudgetMutationFunctions = (
    queryClient: QueryClient,
): MutationFunctions<{ budgetId: string; data: Omit<Budget, "id"> }, UpdateBudgetResponse | UnsuccessfulResponse> => {
    return {
        fn: (variables) => APIHelper.updateBudget(variables.budgetId, variables.data),
        options: {
            onMutate: (variables) => {
                queryClient.cancelQueries(BUDGET_QUERY_CLIENT_KEY);
                const previousBudgets = queryClient.getQueryData<Budget[]>(BUDGET_QUERY_CLIENT_KEY);

                if (previousBudgets) {
                    queryClient.setQueryData<Budget[]>(BUDGET_QUERY_CLIENT_KEY, [
                        ...previousBudgets.filter((budget) => budget.id !== variables.budgetId),
                        { id: variables.budgetId, name: variables.data.name, users: variables.data.users },
                    ]);
                }
            },
        },
    };
};
export const deleteBudgetMutationFunctions = (
    queryClient: QueryClient,
): MutationFunctions<{ budgetId: string }, DeleteBudgetResponse | UnsuccessfulResponse> => {
    return {
        fn: (variables) => APIHelper.deleteBudget(variables.budgetId),
        options: {
            onMutate: (variables) => {
                queryClient.cancelQueries(BUDGET_QUERY_CLIENT_KEY);
                const previousBudgets = queryClient.getQueryData<Budget[]>(BUDGET_QUERY_CLIENT_KEY);

                if (previousBudgets) {
                    queryClient.setQueryData<Budget[]>(BUDGET_QUERY_CLIENT_KEY, [
                        ...previousBudgets.filter((budget) => budget.id !== variables.budgetId),
                    ]);
                }
                // TODO - also modify expenses
            },
        },
    };
};
export const createExpenseMutationFunctions = (
    queryClient: QueryClient,
): MutationFunctions<Omit<Expense, "id">, CreateExpenseResponse | UnsuccessfulResponse> => {
    return {
        fn: (variables) => APIHelper.createExpense(variables),
        options: {
            onMutate: () => {
                queryClient.cancelQueries(EXPENSE_QUERY_CLIENT_KEY);
            },
            onSuccess: (response, variables) => {
                const previousExpenses = queryClient.getQueryData<Expense[]>(EXPENSE_QUERY_CLIENT_KEY);

                if (previousExpenses && response.success) {
                    queryClient.setQueryData<Expense[]>(EXPENSE_QUERY_CLIENT_KEY, [
                        ...previousExpenses,
                        { id: response.id, ...variables },
                    ]);
                }
            },
        },
    };
};
export const editExpenseMutationFunctions = (
    queryClient: QueryClient,
): MutationFunctions<
    { expenseId: string; data: Omit<Expense, "id"> },
    UpdateExpenseResponse | UnsuccessfulResponse
> => {
    return {
        fn: (variables) => APIHelper.updateExpense(variables.expenseId, variables.data),
        options: {
            onMutate: (variables) => {
                queryClient.cancelQueries(EXPENSE_QUERY_CLIENT_KEY);
                const previousExpenses = queryClient.getQueryData<Expense[]>(EXPENSE_QUERY_CLIENT_KEY);

                if (previousExpenses) {
                    queryClient.setQueryData<Expense[]>(EXPENSE_QUERY_CLIENT_KEY, [
                        ...previousExpenses.filter((expense) => expense.id !== variables.expenseId),
                        { id: variables.expenseId, ...variables.data },
                    ]);
                }
            },
        },
    };
};
export const deleteExpenseMutationFunctions = (
    queryClient: QueryClient,
): MutationFunctions<{ expenseId: string }, DeleteExpenseResponse | UnsuccessfulResponse> => {
    return {
        fn: (variables) => APIHelper.deleteExpense(variables.expenseId),
        options: {
            onMutate: (variables) => {
                queryClient.cancelQueries(EXPENSE_QUERY_CLIENT_KEY);
                const previousExpenses = queryClient.getQueryData<Expense[]>(EXPENSE_QUERY_CLIENT_KEY);

                if (previousExpenses) {
                    queryClient.setQueryData<Expense[]>(EXPENSE_QUERY_CLIENT_KEY, [
                        ...previousExpenses.filter((expense) => expense.id !== variables.expenseId),
                    ]);
                }
            },
        },
    };
};

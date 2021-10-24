import { getCookie, notUndefined } from "@markaronin/jefferson-util";
import { CreateBudgetRequest, CreateExpenseRequest, UpdateBudgetRequest, UpdateExpenseRequest } from "./request";
import {
    CreateBudgetResponse,
    CreateExpenseResponse,
    DeleteBudgetResponse,
    DeleteExpenseResponse,
    ListBudgetsResponse,
    ListExpensesResponse,
    UnsuccessfulResponse,
    UpdateBudgetResponse,
    UpdateExpenseResponse,
} from "./response";

export class APIHelper {
    public static createBudget(body: CreateBudgetRequest): Promise<CreateBudgetResponse | UnsuccessfulResponse> {
        return APIHelper.jsonPostRequest("budgets", body);
    }
    public static listBudgets(): Promise<ListBudgetsResponse | UnsuccessfulResponse> {
        return APIHelper.jsonGetRequest("budgets");
    }
    public static updateBudget(
        budgetId: string,
        body: UpdateBudgetRequest,
    ): Promise<UpdateBudgetResponse | UnsuccessfulResponse> {
        return APIHelper.jsonPutRequest(`budgets/${budgetId}`, body);
    }
    public static deleteBudget(budgetId: string): Promise<DeleteBudgetResponse | UnsuccessfulResponse> {
        return APIHelper.jsonDeleteRequest(`budgets/${budgetId}`);
    }

    public static createExpense(body: CreateExpenseRequest): Promise<CreateExpenseResponse | UnsuccessfulResponse> {
        return APIHelper.jsonPostRequest("expenses", body);
    }
    public static listExpensesForBudget(budgetId: string): Promise<ListExpensesResponse | UnsuccessfulResponse> {
        return APIHelper.jsonGetRequest(`budgets/${budgetId}/expenses`);
    }
    public static updateExpense(
        expenseId: string,
        body: UpdateExpenseRequest,
    ): Promise<UpdateExpenseResponse | UnsuccessfulResponse> {
        return APIHelper.jsonPutRequest(`expenses/${expenseId}`, body);
    }
    public static deleteExpense(expenseId: string): Promise<DeleteExpenseResponse | UnsuccessfulResponse> {
        return APIHelper.jsonDeleteRequest(`expenses/${expenseId}`);
    }

    // Private methods

    private static readonly baseUrl = "https://api.budget.markaronin.com";

    private static jsonGetRequest(url: string): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "GET",
        });
    }

    private static jsonPutRequest(url: string, body: unknown): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    private static jsonPostRequest(url: string, body: unknown): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    private static jsonDeleteRequest(url: string): Promise<any | UnsuccessfulResponse> {
        return APIHelper.handleFetch(url, {
            method: "DELETE",
        });
    }

    private static handleFetch(url: string, options: RequestInit): Promise<any | UnsuccessfulResponse> {
        return fetch(`${APIHelper.baseUrl}/${url}`, {
            ...options,
            headers: { ...options.headers, authorization: notUndefined(getCookie("Auth")) },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error(response);
                    throw new Error("Something went wrong");
                }
            })
            .catch((reason) => {
                console.error(reason);
                return { success: false };
            });
    }
}

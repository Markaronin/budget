export interface Budget {
    id: string;
    name: string;
    userIds: string[];
}

export interface Expense {
    id: string;
    name: string;
    to: string;
    from: string;
    type: number;
    amount: number;
}

export interface ManualExpense extends Expense {
    type: 1;
    date: number;
}
export interface RecurringExpense extends Expense {
    type: 2;
    frequency: number;
    start: number;
    end?: number;
}
export interface PercentExpense extends Expense {
    type: 3;
    start: number;
    end?: number;
}

import { alertHelper } from "@markaronin/alert-helper";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createExpenseMutationFunctions } from "../../../api-helper/query-helper";
import { createRadioButtons, DistributiveOmit } from "../../../common";
import { DateUtil } from "../../../dateutil";
import { CompleteExpense } from "../../../model";

type RestOfExpense = DistributiveOmit<CompleteExpense, "id" | "name" | "description" | "from" | "to">;
interface RestOfExpenseValueGetterProps {
    handleEdit: (newValue: RestOfExpense) => void;
    currentValue: RestOfExpense;
}
const RestOfExpenseValueGetter = ({ handleEdit, currentValue }: RestOfExpenseValueGetterProps): JSX.Element => {
    if (currentValue.type === 1) {
        alertHelper.addAlert({ severity: "error", message: "Unimplemented expense type" });
        return <div>Asdf</div>;
    } else if (currentValue.type === 2) {
        alertHelper.addAlert({ severity: "error", message: "Unimplemented expense type" });
        return <div>Asdf</div>;
    } else if (currentValue.type === 3) {
        return (
            <div>
                <input
                    placeholder="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(event) => handleEdit({ ...currentValue, amount: Number(event.currentTarget.value) })}
                />
                <br />
                <input
                    type="date"
                    value={DateUtil.millisecondsSinceEpochToDateInput(currentValue.date)}
                    onChange={(event) =>
                        handleEdit({
                            ...currentValue,
                            date: DateUtil.dateInputToMillisecondsSinceEpoch(event.currentTarget.value),
                        })
                    }
                />
            </div>
        );
    } else if (currentValue.type === 4) {
        alertHelper.addAlert({ severity: "error", message: "Unimplemented expense type" });
        return <div>Asdf</div>;
    } else {
        alertHelper.addAlert({ severity: "error", message: "Unrecognized expense type" });
        throw new Error();
    }
};

interface ExpenseCreatorProps {
    handleCancel: () => void;
    currentBudgetId: string;
    isIncome: boolean;
}
export const ExpenseCreator = ({ handleCancel, currentBudgetId, isIncome }: ExpenseCreatorProps): JSX.Element => {
    const queryClient = useQueryClient();

    const createExpenseMutationFns = createExpenseMutationFunctions(queryClient);
    const handleCreateExpenseMutation = useMutation(createExpenseMutationFns.fn, {
        ...createExpenseMutationFns.options,
    });
    handleCreateExpenseMutation.data;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [from, setFrom] = useState<string | undefined>(isIncome ? undefined : currentBudgetId);
    const [to, setTo] = useState<string | undefined>(isIncome ? currentBudgetId : undefined);
    setTo;
    setFrom; // TODO - remove
    const [restOfExpense, setRestOfExpense] = useState<RestOfExpense>({
        type: 3,
        amount: 0,
        date: Date.now(),
    });

    return (
        <div className="expense-creator">
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
            />
            <br />
            <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
            />
            Type:
            <br />
            {createRadioButtons(
                [
                    { name: "Recurring", value: 1 },
                    { name: "Continuous", value: 2 },
                    { name: "Manual", value: 3 },
                    { name: "Percent", value: 4 },
                ],
                restOfExpense.type,
                (newValue: 1 | 2 | 3 | 4) => {
                    if (newValue === 1) {
                        setRestOfExpense({
                            type: 1,
                            amount: 0,
                            frequency: 0,
                            start: 0,
                        });
                    } else if (newValue === 2) {
                        setRestOfExpense({
                            type: 2,
                            period: 0,
                            start: 0,
                            amount: 0,
                        });
                    } else if (newValue === 3) {
                        setRestOfExpense({
                            type: 3,
                            amount: 0,
                            date: 0,
                        });
                    } else if (newValue === 4) {
                        setRestOfExpense({
                            type: 4,
                            amount: 0,
                            start: 0,
                        });
                    } else {
                        alertHelper.addAlert({ severity: "error", message: "Unrecognized expense type" });
                        throw new Error();
                    }
                },
            )}
            <hr />
            <RestOfExpenseValueGetter handleEdit={setRestOfExpense} currentValue={restOfExpense} />
            <hr />
            <button
                onClick={() => {
                    handleCreateExpenseMutation.mutate({ name, description, from, to, ...restOfExpense });
                    handleCancel();
                }}
            >
                Done
            </button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

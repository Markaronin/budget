import React, { useState } from "react";
import { handleEnter } from "../../../common";

interface CreateBudgetWidgetProps {
    handleCancel: () => void;
    handleCreateBudget: (newBudgetName: string) => void;
}
export const CreateBudgetWidget = ({ handleCancel, handleCreateBudget }: CreateBudgetWidgetProps): JSX.Element => {
    const [name, setName] = useState("");

    return (
        <div className="create-budget-widget">
            <input
                type="text"
                placeholder="Budget name"
                value={name}
                onKeyDown={handleEnter(() => handleCreateBudget(name))}
                onChange={(event) => setName(event.currentTarget.value)}
            />
            <br />
            <button onClick={() => handleCreateBudget(name)}>Create</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

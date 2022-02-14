import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets()
{
    return useContext(BudgetsContext)
}

// { id, name, maxlimit} budget
// { id, budgetid, amount, description} expenses

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    function getBudgetExpenses(budgetId)
    {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId })
    {
        setExpenses(expensesList => [...expensesList, {id: uuidV4(), description, amount, budgetId}])
    }

    function addBudget({ name, max })
    {
        setBudgets((prevBudgets) =>
        {
            if (prevBudgets.find(budget => budget.name === name)) {
              return prevBudgets
         }
         return [...prevBudgets, {id: uuidV4(), name: name, max: max}]
        })   
    }

    function deleteBudget(budgetId)
    {
        // Todo: handle expenses
        setExpenses(() =>
        {
            return expenses.map(expense =>
            {
                if (expense.budgetId && UNCATEGORIZED_BUDGET_ID !== expense.budgetId) {
                  expense.budgetId = UNCATEGORIZED_BUDGET_ID
                }
                return expense
            })
        })
        setBudgets(() => { return budgets.filter(budget => budget.id !== budgetId) });
    }

    function deleteExpense(expenseId)
    {
        setExpenses(() => { return expenses.filter(expense => expense.id !== expenseId) })
    }
    
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{children}</BudgetsContext.Provider>
    );
}
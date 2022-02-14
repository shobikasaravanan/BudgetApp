import React from 'react'
import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from '../Utils'

import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';
export default function ViewExpensesModal({ showModal, onHandleClose, defaultBudgetId })
{
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
    
    function deleteExpenseIn(id)
    {
        deleteExpense(id)
        onHandleClose()

    }

    function deleteBudgetIn(id)
    {
        deleteBudget(id)
        onHandleClose()

    }

    const budget = UNCATEGORIZED_BUDGET_ID === defaultBudgetId ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID} : budgets.find(budget => budget.id === defaultBudgetId)

    const budgetExpenses = getBudgetExpenses(budget?.id)
    
    return (
        <Modal show={showModal} onHide={onHandleClose}>
            <Modal.Header>
                <Modal.Title>Expenses of {budget?.name}</Modal.Title>
                {UNCATEGORIZED_BUDGET_ID !== defaultBudgetId && <Button onClick={() => deleteBudgetIn(budget.id)} size='sm' variant='outline-danger'>Delete</Button>}
            </Modal.Header>
            <Modal.Body>
            <Stack direction='vertical' gap='3'>
                {budgetExpenses.map(expense =>
                (
                <Stack direction='horizontal' gap='2' key={expense.id}>
                    <div className='me-auto fs-4'>{expense.description}</div>
                        <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                        <Button size='sm' variant='outline-danger' onClick={() => deleteExpenseIn(expense.id)}>&times;</Button>
                </Stack>
                ))}
                </Stack>
            </Modal.Body>
    </Modal>
  )
}

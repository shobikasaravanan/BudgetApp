import React, { useRef} from 'react'
import { Form, Modal, Button } from "react-bootstrap"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';
export default function AddExpensesModal({ showModal, onHandleClose, defaultBudgetId })
{
    const descRef = useRef('');
    const amountRef = useRef(0);
    const budgetIdRef = useRef('');

    const { addExpense, budgets } = useBudgets();
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        addExpense({
                description: descRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value
        })
        onHandleClose();
    }
    
    return (
        <Modal show={showModal} onHide={onHandleClose}>
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Label>Budget Category</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}  >
                            <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            
                            {budgets.map((budget,id) => (
                                <option key={id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount Spending</Form.Label>
                        <Form.Control ref={amountRef} type="text" required min={0} step={0.01}/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
            </Modal.Body>
          </Form>
    </Modal>
  )
}

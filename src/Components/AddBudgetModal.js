import React, { useRef} from 'react'
import { Form, Modal, Button } from "react-bootstrap"
import { useBudgets } from '../contexts/BudgetContext';
export default function AddBudgetModal({ showModal, onHandleClose })
{
    const nameRef = useRef('');
    const maxRef = useRef(0);
    const { addBudget } = useBudgets();
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();
            addBudget({
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            })
            onHandleClose();

    }
    return (
        <Modal show={showModal} onHide={onHandleClose}>
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxRef} type="text" required min={0} step={0.01}/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
            </Modal.Body>
          </Form>
    </Modal>
  )
}

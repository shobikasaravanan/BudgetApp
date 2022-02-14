import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Stack, Button } from 'react-bootstrap';
import BudgetCard from './Components/BudgetCard';
import UncategorizedCard from './Components/UncategorizedCard';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpensesModal from './Components/AddExpensesModal'
import ViewExpensesModal from './Components/ViewExpensesModal';

import TotalBudgetCard from './Components/TotalBudgetCard';

import { useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';

function App()
{
  const [showModal, setShowModal] = useState(false)
  const [addExpenseModal, setAddExpenseModal] = useState(false)
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  const [viewExpensesBudgetID,setViewExpensesBudgetID] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId)
  {
    setAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  function openViewExpenses(budgetId)
  {
    setShowViewExpensesModal(true);
    setViewExpensesBudgetID(budgetId);
  }

  return <>
    
    <Container>
      <Stack direction="horizontal" gap={3} className="my-4">
        <h1 className="me-auto">Budgets</h1>

        <Button variant="primary" onClick={()=>setShowModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>

      </Stack>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1rem))',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        {budgets.map(budget =>
        {

          const amount = getBudgetExpenses(budget.id).map(budget => budget.amount)?.reduce((tot, amount) => tot + amount, 0);
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              gray={true}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              openViewExpenses={()=> openViewExpenses(budget.id)}
            ></BudgetCard>
            
          )
        }
        )}
         <UncategorizedCard
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          openViewExpenses={()=> openViewExpenses(UNCATEGORIZED_BUDGET_ID)}

        ></UncategorizedCard>
       
      </div>
      
      <div style={{ height: '300px', width: '300px', marginTop: '30px', marginLeft: 'auto'}}><TotalBudgetCard></TotalBudgetCard></div>
      

  </Container>
    <AddBudgetModal
      showModal={showModal}
      onHandleClose={() => setShowModal(false)}></AddBudgetModal>
    
    <AddExpensesModal
      showModal={addExpenseModal}
      defaultBudgetId={addExpenseModalBudgetId}
      onHandleClose={() => setAddExpenseModal(false)}
    />

    <ViewExpensesModal
      showModal={showViewExpensesModal}
      defaultBudgetId={viewExpensesBudgetID}
      onHandleClose={() => setShowViewExpensesModal(false)}
    />
  </>
}
export default App;

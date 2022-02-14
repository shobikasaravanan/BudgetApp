import { Card, ProgressBar } from 'react-bootstrap'
import { currencyFormatter } from '../Utils'
import { Stack, Button } from 'react-bootstrap';

export default function BudgetCard({ name, amount, gray, max, onAddExpenseClick, openViewExpenses, hideButton })
{
	const classNames = [];
	if (amount >= max) {
		classNames.push('bg-danger', 'bg-opacity-10')
	} else if(gray) {
		classNames.push('bg-light')
	}
	function getProgressBarVariant(amount, max)
	{

		let value = (amount * 100) / max;
		
		if (value < 50) {
			return 'primary'
		} else if (value < 75) {
			return 'warning'
		}
		
		return 'danger'
	}
  return (
    <div>
      <Card className={classNames.join(" ")}>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
						<div className="me-2 word-break">
							{name}
						</div>
						<div className="d-flex align-items-baseline">
						  {currencyFormatter.format(amount)}
						  {max && <span className="font-muted fs-6 ms-1"> / {currencyFormatter.format(max)}</span> }
						</div>
						
          </Card.Title>
				  {max && <div><ProgressBar className="rounded-pill"
					  min={0}
					  max={100}
					  now={(amount * 100) / max}
					  variant={getProgressBarVariant(amount, max)}
              
				  ></ProgressBar></div>}
				  {!hideButton && <Stack direction="horizontal" gap={3} className="my-4">
					  <Button variant="outline-primary" onClick={() => onAddExpenseClick()}>Add Expense</Button>
					  <Button variant="outline-secondary" onClick={() => openViewExpenses()}>View Expense</Button>
				  </Stack>}
        </Card.Body>
      </Card>
    </div>
  )
}

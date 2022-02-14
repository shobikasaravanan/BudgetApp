import BudgetCard from "./BudgetCard";
import { useBudgets } from '../contexts/BudgetContext';

export default function UncategorizedCard(props)
{
    const { budgets, expenses } = useBudgets();

    const expenseTotal = expenses.reduce((total, expense) => total + expense.amount, 0);
    const max = budgets.reduce((total, budget) => total + budget.max, 0);

    if (max === 0) return null;

    return (<BudgetCard name={"Total"} amount={expenseTotal} max={max} gray={true} hideButton={true} {...props} />);
}

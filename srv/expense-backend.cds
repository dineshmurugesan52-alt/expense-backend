using { expense } from '../db/schema';

service ExpenseService {
    entity Expenses as projection on expense.Expenses;
    entity ExpenseChart as projection on expense.ExpenseChart;
    entity ExpenseMonthly as projection on expense.ExpenseMonthly;
}

/*service ExpenseService {
    entity Expense as projection on expense.Expenses
}*/
using { expense } from '../db/schema';

service ExpenseService {
    entity Expenses as projection on expense.Expenses;
    entity ExpenseChart as projection on expense.ExpenseChart;
}
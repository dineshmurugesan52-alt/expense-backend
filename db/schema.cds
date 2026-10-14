namespace expense;

entity Expenses {
    key ID : UUID;
    amount : Decimal(10,2);
    date : Date;
    category : String;
    paymentMode : String;
    note : String;
}
entity ExpenseChart{
    key ID : UUID;
    date : Date;
    food : Decimal(10,2);
    travel : Decimal(10,2);
    accommodation : Decimal(10,2);
    others : Decimal(10,2);
}
entity ExpenseMonthly{
    key ID : UUID;
    month : String;
    totalExpense:Decimal(10,2);
    food:Decimal(10,2);
    travel:Decimal(10,2);
    accommodation:Decimal(10,2);
    others:Decimal(10,2);
}
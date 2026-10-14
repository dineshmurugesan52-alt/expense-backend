const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {

    const { Expenses, ExpenseChart, ExpenseMonthly } = this.entities;

    this.on("READ", ExpenseChart, async (req) => {

    const data = await SELECT.from(Expenses);
    console.log("Fetched Data:", data);
    const chartData = {};

    data.forEach((expense) => {

        const date = expense.date;

        if (!chartData[date]) {
            chartData[date] = {
                date: date,
                food: 0,
                travel: 0,
                accommodation: 0,
                others: 0
            };
        }
            switch (expense.category) {
                case "Food":
                    chartData[date].food += Number(expense.amount);
                    break;
                case "Travel":
                    chartData[date].travel += Number(expense.amount);
                    break;
                case "Accommodation":
                    chartData[date].accommodation += Number(expense.amount);
                    break;
                case "Others":
                    chartData[date].others += Number(expense.amount);
                    break;

        }
    });

    console.log("Chart Data:", chartData);

    return Object.values(chartData);
});
    this.on("READ", ExpenseMonthly, async (req) => {
        const data = await SELECT.from(Expenses);
        const monthlyData = {};
        const where = req.query?.SELECT?.where || [];
        const monthFilterIndex = where.findIndex((token, index) =>
            token?.ref?.at(-1) === "month" &&
            where[index + 1] === "=" &&
            typeof where[index + 2]?.val === "string"
        );
        const requestedMonth = monthFilterIndex >= 0
            ? where[monthFilterIndex + 2].val
            : undefined;

        data.forEach((expense) => {
            const month = expense.date ? expense.date.slice(0, 7) : "Unknown";
            if (requestedMonth && month !== requestedMonth) {
                return;
            }

            if (!monthlyData[month]) {
                monthlyData[month] = {
                    month: month,
                    totalExpense: 0,
                    food: 0,
                    travel: 0,
                    accommodation: 0,
                    others: 0
                };
            }

            switch (expense.category) {
                case "Food":
                    monthlyData[month].food += Number(expense.amount);
                    break;
                case "Travel":
                    monthlyData[month].travel += Number(expense.amount);
                    break;
                case "Accommodation":
                    monthlyData[month].accommodation += Number(expense.amount);
                    break;
                case "Others":
                    monthlyData[month].others += Number(expense.amount);
                    break;
            }
            monthlyData[month].totalExpense += Number(expense.amount);
        });

        return Object.values(monthlyData);
    });
});
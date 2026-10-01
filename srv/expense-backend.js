const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {

    const { Expenses, ExpenseChart } = this.entities;

    this.on("READ", ExpenseChart, async (req) => {

    const data = await SELECT.from(Expenses);

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

});
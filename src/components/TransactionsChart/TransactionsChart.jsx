import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./TransactionsChart.module.css";
import { useSelector } from "react-redux";
import {
  selectExpensesTotal,
  selectIncomesTotal,
  selectTransactionByType,
} from "../../redux/transactions/selectors";

const TransactionsChart = ({ transactionsType }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 375);

  const rawList = useSelector(selectTransactionByType(transactionsType));
  const incomesTotal = useSelector(selectIncomesTotal);
  const expensesTotal = useSelector(selectExpensesTotal);

  const totalAmount =
    transactionsType === "incomes" ? incomesTotal : expensesTotal;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 375);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const innerRadius = isMobile ? 70 : 95;
  const outerRadius = isMobile ? 121 : 146;

  // Генеруємо кольори
  const COLORS = [
    "#FFFFFF", // білий — для акцентів і світлих частин
    "#1E90FF", // яскравий синій (Dodger Blue)
    "#FF4500", // яскравий оранжево-червоний (Orange Red)
    "#32CD32", // лаймовий зелений (Lime Green)
    "#FFD700", // золото (Gold)
    "#8A2BE2", // синьо-фіолетовий (Blue Violet)
    "#FF69B4", // яскравий рожевий (Hot Pink)
    "#00CED1", // темний бірюзовий (Dark Turquoise)
    "#FF8C00", // темний помаранчевий (Dark Orange)
    "#4B0082", // індиго (Indigo)
    "#7FFF00", // яскравий зелений (Chartreuse)
    "#DC143C", // яскравий червоний (Crimson)
    "#00BFFF", // глибокий небесно-блакитний (Deep Sky Blue)
    "#FF6347", // томатний (Tomato)
    "#2E8B57", // морська хвоя (Sea Green)
  ];

  // Форматуємо дані для чарта
  const chartData =
    rawList?.map((item, index) => ({
      name: item.category.categoryName || `Category ${index + 1}`,
      value: item.sum ?? 0,
      color: COLORS[index % COLORS.length],
    })) || [];
  // console.log(item);
  // console.log("rawList:", rawList);
  // console.log("chartData:", chartData);

  return (
    <div className={styles["expenses-chart"]}>
      <h3 className={styles.title}>
        {transactionsType === "incomes"
          ? "Income categories"
          : "Expenses categories"}
      </h3>

      <div className={styles["chart-and-list"]}>
        <div className={styles["chart-wrapper"]}>
          <div className={styles.centerTotal}>
            {totalAmount > 0 ? "100%" : "No data"}
          </div>
          <ResponsiveContainer className={styles.responsiveWrapper}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={-8}
                cornerRadius={10}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles["category-list"]}>
          {chartData.map((item, idx) => (
            <div key={idx} className={styles["category-item"]}>
              <span
                className={styles.dot}
                style={{ backgroundColor: item.color }}
              />
              <span className={styles.name}>{item.name}</span>
              <span className={styles.percent}>
                {totalAmount > 0
                  ? `${((item.value / totalAmount) * 100).toFixed(0)}%`
                  : "0%"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsChart;

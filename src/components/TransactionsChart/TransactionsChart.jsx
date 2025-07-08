import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./TransactionsChart.module.css";
import { useSelector } from "react-redux";
import {
  selectExpensesTotal,
  selectIncomesTotal,
  selectTransactionByType,
} from "../../redux/transactions/selectors";

const RADIAN = Math.PI / 180;

export const TransactionsChart = ({ transactionsType }) => {
  console.log(transactionsType);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 375);

  const list = useSelector(selectTransactionByType(transactionsType));
  const incomesTotal = useSelector(selectIncomesTotal);
  const expensesTotal = useSelector(selectExpensesTotal);

  const totalAmount =
    transactionsType === "incomes" ? incomesTotal : expensesTotal;

  console.log(incomesTotal);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 375);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const innerRadius = isMobile ? 70 : 95;
  const outerRadius = isMobile ? 121 : 146;

  const colors = (data) => {
    const colors = [
      "#008000",
      "#32CD32",
      "#00FA9A",
      "#98FB98",
      "#228B22",
      "#2E8B57",
      "#3CB371",
      "#00FF7F",
      "#66CDAA",
      "#8FBC8F",
      "#2F4F4F",
      "#aabaaa",
      "#dbf0db",
      "#777f77",
      "#5a5e5a",
    ];

    return data.map((item, index) => ({
      ...item,
      color: colors[index % colors.length],
    }));
  };

  const colorData = colors(list);

  return (
    <div className={styles["expenses-chart"]}>
      <h3 className={styles.title}>Expenses categories</h3>

      <div className={styles["chart-and-list"]}>
        <div className={styles["chart-wrapper"]}>
          <div className={styles.centerTotal}>
            {totalAmount > 0 ? "100%" : "No data"}
          </div>
          <ResponsiveContainer
            className={styles.responsiveWrapper}
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={colorData}
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
                {colorData.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles["category-list"]}>
          {colorData.map((item, idx) => (
            <div key={idx} className={styles["category-item"]}>
              <span
                className={styles.dot}
                style={{ backgroundColor: item.color }}
              />
              <span className={styles.name}>
                {item.name || item.categoryName}
              </span>
              <span className={styles.percent}>
                {totalAmount > 0
                  ? `${((item.sum / totalAmount) * 100).toFixed(0)}%`
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

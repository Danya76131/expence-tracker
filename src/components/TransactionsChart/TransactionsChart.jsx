import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./TransactionsChart.module.css";

const RADIAN = Math.PI / 180;

const MOCK_DATA = [
  { name: "Hobby", value: 40, color: "#00FF83" },
  { name: "Cinema", value: 25, color: "#FFFFFF" },
  { name: "Products", value: 20, color: "#00C49F" },
  { name: "Health", value: 15, color: "#3B3B3B" },
  { name: "Books", value: 10, color: "#8884d8" }, // 5-й для перевірки скролу
];

export const TransactionsChart = ({ data = MOCK_DATA }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 375);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 375);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const innerRadius = isMobile ? 70 : 95;
  const outerRadius = isMobile ? 121 : 146;

  return (
    <div className={styles["expenses-chart"]}>
      <h3 className={styles.title}>Expenses categories</h3>

      <div className={styles["chart-and-list"]}>
        <div className={styles["chart-wrapper"]}>
          <div className={styles.centerTotal}>{"100"}%</div>
          <ResponsiveContainer className={styles.responsiveWrapper}>
            <PieChart>
              <Pie
                className={styles.rechartsWrapper}
                data={data}
                dataKey="value"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={-8}
                border-radius={10}
                cornerRadius={10}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles["category-list"]}>
          {data.map((item, idx) => (
            <div key={idx} className={styles["category-item"]}>
              <span
                className={styles.dot}
                style={{ backgroundColor: item.color }}
              />
              <span className={styles.name}>{item.name}</span>
              <span className={styles.percent}>
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsChart;

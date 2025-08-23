"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PieGraphicProps = {
  current_progress: number;
};

const PieGraphic = ({ current_progress }: PieGraphicProps) => {
  const pieData = [
    { name: "Avance", value: current_progress },
    { name: "Restante", value: 100 - current_progress },
  ];
  const COLORS = ["#91cc75", "#5470c6"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent === 0) {
      return null;
    }

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieGraphic;

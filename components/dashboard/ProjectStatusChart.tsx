// components/dashboard/ProjectStatusChart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartData {
  name: string;
  total: number;
}

interface ProjectStatusChartProps {
  data: ChartData[];
}

export const ProjectStatusChart = ({ data }: ProjectStatusChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos por Estado</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#db7e37", fontWeight: 400 }}
              />
              <YAxis
                allowDecimals={false}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
                labelStyle={{ color: "black", fontWeight: "bold" }}
              />
              <Bar dataKey="total" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

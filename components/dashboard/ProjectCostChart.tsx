// components/dashboard/ProjectCostChart.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Tipo para los datos que recibe este gráfico específico
type ChartData = {
  cui: string;
  cost: number;
};

interface ProjectCostChartProps {
  data: ChartData[];
}

// Función para formatear números grandes en el eje Y (ej: 1000000 -> 1M)
const formatAxisTick = (tickItem: number) => {
  if (tickItem >= 1000000) {
    return `${(tickItem / 1000000).toFixed(1)}M`;
  }
  if (tickItem >= 1000) {
    return `${(tickItem / 1000).toFixed(0)}K`;
  }
  return tickItem.toString();
};

// Función para formatear el valor dentro del tooltip como moneda
const formatTooltipValue = (value: number) => {
  return `S/ ${value.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const ProjectCostChart = ({ data }: ProjectCostChartProps) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Costo de Proyectos (Liquidación)</CardTitle>
        <CardDescription>
          Visualización de los montos de obra ordenados de menor a mayor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="cui"
                angle={-45} // Rotamos las etiquetas para que no se superpongan
                textAnchor="end"
                tick={{ fill: "#db7e37", fontWeight: 400 }}
                height={70} // Damos más espacio para las etiquetas rotadas
                interval={0} // Mostramos todas las etiquetas
                fontSize={14}
              />
              <YAxis
                tickFormatter={formatAxisTick} // Usamos el formateador para el eje Y
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
                formatter={formatTooltipValue} // Formateamos el valor como moneda
                labelFormatter={(label) => `CUI: ${label}`} // Formateamos la etiqueta del tooltip
                labelStyle={{ color: "black", fontWeight: "bold" }}
              />
              <Bar
                dataKey="cost"
                name="Monto de Obra"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

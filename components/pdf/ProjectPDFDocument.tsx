"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { ProjectByIdType } from "@/actions/project.action";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  section: { marginBottom: 15 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a202c",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2d3748",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  gridItem: { width: "50%", paddingRight: 10 },
  detailItem: { flexDirection: "row", marginBottom: 5 },
  detailLabel: { width: "40%", color: "#4a5568" },
  detailValue: { width: "60%", fontWeight: "bold" },
  chartSection: { flexDirection: "row", marginTop: 15, alignItems: "center" },
  chartContainer: { width: 120, height: 120 },
  legendContainer: { marginLeft: 20 },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  historyTable: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#d1d5db",
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f4f6",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableColNotes: { width: "50%" },
});

// --- Funciones de formato (adaptadas para recibir Date y number) ---
const formatCurrency = (value?: number | null) =>
  value ? `S/ ${value.toLocaleString("es-PE")}` : "No especificado";

const formatDate = (date?: Date | null) =>
  date
    ? new Date(date).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No especificado";

// --- Componente de Gráfico de Pastel (sin cambios, es perfecto) ---
const PdfPieChart = ({ progress }: { progress: number }) => {
  // ... (Tu código del gráfico de pastel va aquí, sin cambios)
  const size = 100;
  const center = size / 2;
  const radius = size / 2;
  const angle = (progress / 100) * 360;

  const getCoordinatesForAngle = (angle: number) => {
    const x = center + radius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y = center + radius * Math.sin(((angle - 90) * Math.PI) / 180);
    return [x, y];
  };

  const [endX, endY] = getCoordinatesForAngle(angle);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const pathData = `M ${center} ${center} L ${center} 0 A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

  return (
    <View style={styles.chartSection}>
      <View style={styles.chartContainer}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          <Path
            d={`M ${center} ${center} L ${center} 0 A ${radius} ${radius} 0 1 1 ${center} ${size} A ${radius} ${radius} 0 1 1 ${center} 0 Z`}
            fill="#e0e0e0"
          />
          {progress > 0 && <Path d={pathData} fill="#4caf50" />}
        </Svg>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <Svg width="10" height="10">
            <Path d="M 0 0 H 10 V 10 H 0 Z" fill="#4caf50" />
          </Svg>
          <Text> Avance: {progress.toFixed(2)}%</Text>
        </View>
        <View style={styles.legendItem}>
          <Svg width="10" height="10">
            <Path d="M 0 0 H 10 V 10 H 0 Z" fill="#e0e0e0" />
          </Svg>
          <Text> Restante: {(100 - progress).toFixed(2)}%</Text>
        </View>
      </View>
    </View>
  );
};

// --- Función para traducir el estado (sin cambios) ---
const getState = (state: string) => {
  // ... (Tu función switch para los estados va aquí, sin cambios)
  switch (state) {
    case "ejecucion":
      return "Ejecución";
    case "liquidado":
      return "Liquidado";
    case "finalizado":
      return "Finalizado";
    case "paralizado":
      return "Paralizado";
    case "pausado":
      return "Pausado";
    case "planificado":
      return "Planificado";
    case "proceso_de_liquidacion":
      return "Proceso de liquidación";
    case "suspendido":
      return "Suspendido";
    default:
      return "Sin estado";
  }
};

interface ProjectPDFDocumentProps {
  project: ProjectByIdType;
}

export const ProjectPDFDocument = ({ project }: ProjectPDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header} fixed>
        Ficha Técnica de Proyecto
      </Text>

      <View style={styles.section}>
        <Text style={styles.title}>{project.name}</Text>
        <Text>CUI: {project.cui}</Text>
        <Text>Estado: {getState(project.status)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Información General</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Contratista:</Text>
              <Text style={styles.detailValue}>
                {project.contractor || "N/A"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>División Funcional:</Text>
              <Text style={styles.detailValue}>
                {project.functional_division}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Monto Obra:</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(project.cost_liquidation)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Monto Supervisión:</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(project.cost_supervision)}
              </Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Inicio:</Text>
              <Text style={styles.detailValue}>
                {formatDate(project.start_date)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Fin Original:</Text>
              <Text style={styles.detailValue}>
                {formatDate(project.original_end_date)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Supervisor:</Text>
              <Text style={styles.detailValue}>
                {project.supervisor || "N/A"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Residente:</Text>
              <Text style={styles.detailValue}>
                {project.resident || "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.detailLabel}>Antecedentes:</Text>
          <Text>{project.project_ackground || "No especificados."}</Text>
        </View>
      </View>

      <Text style={styles.subTitle}>Gráfico del avance</Text>
      <PdfPieChart progress={project.current_progress} />

      <View style={styles.section} break>
        <Text style={styles.subTitle}>Historial de Avance</Text>
        <View style={styles.historyTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Fecha</Text>
            <Text style={styles.tableColHeader}>Avance (%)</Text>
            <Text style={[styles.tableColHeader, { width: "50%" }]}>Notas</Text>
          </View>
          {/* --- AQUÍ LA ADAPTACIÓN IMPORTANTE --- */}
          {project.ProjectProgress.map((progress) => (
            <View key={progress.id} style={styles.tableRow}>
              <Text style={styles.tableCol}>
                {formatDate(progress.progressDate)}
              </Text>
              <Text style={styles.tableCol}>
                {progress.progress.toFixed(2)}%
              </Text>
              <Text style={[styles.tableCol, { width: "50%" }]}>
                {progress.description || ""}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

"use client";
import { CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "@/helpers/project.helper";
import { Badge } from "../ui/badge";
import { ProjectByIdType } from "@/actions/project.action";
import DeleteProgress from "./DeleteProgress";
import UpdateProgress from "./UpdateProgress";

type ProgressHistoryProps = {
  progresses: ProjectByIdType["ProjectProgress"];
};

const ProgressHistory = ({ progresses }: ProgressHistoryProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Historial de Seguimiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        {progresses.length > 0 ? (
          <div className="space-y-4">
            {progresses.map((progress, index) => (
              <div key={progress.id} className="relative">
                {index !== progresses.length - 1 && (
                  <div className="absolute left-4 top-8 w-px h-full bg-border" />
                )}
                <div className="flex gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-sm">
                        {formatDate(progress.progressDate)}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {progress.progress.toFixed(2)}%
                      </Badge>
                    </div>
                    {progress.description && (
                      <p className="text-sm text-muted-foreground">
                        {progress.description}
                      </p>
                    )}
                  </div>
                  <UpdateProgress progress={progress} />
                  <DeleteProgress progressId={progress.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hay actualizaciones de progreso disponibles
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default ProgressHistory;

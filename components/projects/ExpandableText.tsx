"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type ExpandableTextProps = {
  icon: any;
  label: string;
  value: string | number | undefined | null;
  maxLines?: number;
  textLength?: number;
};

const ExpandableText = ({
  icon: Icon,
  label,
  value,
  maxLines = 2,
  textLength = 100,
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const textValue = value ? value.toString() : "No especificado";
  const needsExpansion = textValue.length > textLength;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {label}
        </p>
        <div className="relative">
          <p
            className={`text-sm font-semibold text-foreground break-words transition-all duration-200 ${
              !isExpanded && needsExpansion ? `line-clamp-${maxLines}` : ""
            }`}
            style={{
              display: !isExpanded && needsExpansion ? "-webkit-box" : "block",
              WebkitLineClamp:
                !isExpanded && needsExpansion ? maxLines : "unset",
              WebkitBoxOrient:
                !isExpanded && needsExpansion ? "vertical" : "unset",
              overflow: !isExpanded && needsExpansion ? "hidden" : "visible",
            }}
          >
            {textValue}
          </p>

          {needsExpansion && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Ver menos
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Ver más
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExpandableText;

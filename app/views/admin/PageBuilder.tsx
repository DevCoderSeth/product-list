"use client";

import React, { ReactNode } from "react";
import { lusitana } from "@/app/views/Fonts";
import KPICard from "./KPICard";
import { Skeleton } from "../components/skeleton";

interface KPI {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
}

interface PageBuilderProps {
  pageTitle: string;
  sectionDescription?: string;
  kpis?: KPI[];
  kpisLoading?: boolean;
  kpiCount?: number;
  actions?: {
    buttons?: ReactNode[];
    filters?: ReactNode[];
    dropdowns?: ReactNode[];
  };
  children?: ReactNode;
}

const PageBuilder: React.FC<PageBuilderProps> = ({
  pageTitle,
  sectionDescription,
  kpis = [],
  kpisLoading = false,
  kpiCount = 4,
  actions,
  children,
}) => {
  return (
    <div className="pt-6 space-y-6 w-full mx-auto">
      {/* Header with categorized quick actions */}
      <div
        className={` flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}
      >
        <div className={`${lusitana.className}`}>
          <h2 className="text-xl font-bold">{pageTitle}</h2>
          {sectionDescription && (
            <p className="text-base text-muted-foreground">
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Quick Actions grouped */}
        {actions && (
          <div className="flex flex-wrap gap-2 items-center">
            {/* Dropdowns first */}
            {actions.dropdowns &&
              actions.dropdowns.map((dropdown, idx) => (
                <div key={`dropdown-${idx}`}>{dropdown}</div>
              ))}

            {/* Filters next */}
            {actions.filters &&
              actions.filters.map((filter, idx) => (
                <div key={`filter-${idx}`}>{filter}</div>
              ))}

            {/* Buttons last */}
            {actions.buttons &&
              actions.buttons.map((button, idx) => (
                <div key={`button-${idx}`}>{button}</div>
              ))}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        {kpisLoading
          ? Array(kpiCount)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={`kpi-skeleton-${idx}`}
                  className="flex-1 min-w-[200px] p-4 bg-secondary rounded-md shadow-sm animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-5 w-20 bg-gray-100 rounded" />{" "}
                      <Skeleton className="h-10 w-24 bg-gray-100 rounded" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Skeleton className="h-10 w-10 bg-gray-100 rounded-full" />
                      <Skeleton className="h-4 w-12 bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>
              ))
          : kpis.map((metric, idx) => (
              <div key={idx} className="flex-1 min-w-[200px]">
                <KPICard
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon}
                  change={metric.change}
                />
              </div>
            ))}
      </div>

      {/* Page-specific content */}
      <div>{children}</div>
    </div>
  );
};

export default PageBuilder;

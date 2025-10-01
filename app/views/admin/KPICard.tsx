"use client";

import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
};

const KPICard = ({ title, value, icon, change }: CardProps) => {
  return (
    <div className="bg-secondary rounded-md shadow-sm p-4 w-full flex items-center justify-between">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
      </div>

      <div className="flex flex-col items-end gap-4">
        {icon}

        {change && (
          <div
            className={`text-sm font-medium ${
              change.startsWith("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;

"use client";

import { Dispatch, SetStateAction } from "react";

import { Socion, Sociotype } from "@lib/socion";
import { Coordinates, Dimensions } from "@lib/types";

import { ActiveType } from "@ui/components/TypeGrid";

export default function TypeSquare({
  sociotype,
  origin: [x, y],
  size: [width, height],
  filter,
  activeType,
  setActiveType,
  setTouchClearAfter,
}: {
  sociotype: Sociotype;
  origin: Coordinates;
  size: Dimensions;
  filter: string;
  activeType: ActiveType;
  setActiveType: Dispatch<SetStateAction<ActiveType>>;
  setTouchClearAfter: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <g
      onPointerEnter={({ pointerType }) => {
        if (pointerType === "mouse") {
          setActiveType(sociotype);
        }
      }}
      onTouchStart={() => {
        if (activeType !== sociotype) {
          const now = new Date();
          now.setMilliseconds(now.getMilliseconds() + 100);
          setTouchClearAfter(now);
          setActiveType(sociotype);
        }
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={width / 15}
        ry={width / 15}
        filter={filter}
        className="fill-gray-300 dark:fill-gray-800"
      />
      <text
        x={x + width / 2}
        y={y + height / 2.5}
        textAnchor="middle"
        style={{ fontSize: height / 3 }}
        className="fill-gray-600 dark:fill-gray-200"
      >
        {sociotype.name}
      </text>
      <foreignObject
        x={x + width / 20}
        y={y + height / 2.25}
        width={width - (width / 20) * 2}
        height={height / 2.25}
      >
        <div className="flex h-full items-center justify-center">
          <p
            style={{ fontSize: height / 7 }}
            className="text-center leading-none text-gray-400 dark:text-gray-400"
          >
            {activeType ? (
              sociotype.getDirectedRelationWith(activeType).role
            ) : (
              <q>{sociotype.nickname}</q>
            )}
          </p>
        </div>
      </foreignObject>
    </g>
  );
}

"use client";

import { useEffect, useState } from "react";

import { Socion, Sociotype } from "@lib/socion";
import { ColorCode, Coordinates, Dimensions } from "@lib/types";
import { chunk } from "@lib/utils";

import TypeSquare from "@ui/components/TypeSquare";

type FilterColor = { id: string; color: ColorCode };
export type ActiveType = Sociotype | null;

const GRID_EDGE = 1200;
const SQUARE_EDGE = 300;
const SQUARE_PADDING = 25;

const SQUARE_SIZE: Dimensions = [
  SQUARE_EDGE - SQUARE_PADDING * 2,
  SQUARE_EDGE - SQUARE_PADDING * 2,
];

const QUADRA_TYPES: ReadonlyArray<ReadonlyArray<Sociotype>> = chunk(
  Socion.sociotypes,
  4,
);
const QUADRA_COORDINATES: ReadonlyArray<ReadonlyArray<Coordinates>> = [
  distributeSquares({ origin: [0, 0] }),
  distributeSquares({ origin: [SQUARE_EDGE * 2, 0] }),
  distributeSquares({ origin: [SQUARE_EDGE * 2, SQUARE_EDGE * 2] }),
  distributeSquares({ origin: [0, SQUARE_EDGE * 2] }),
];
const QUADRA_COLORS: ReadonlyArray<FilterColor> = [
  { id: "typegrid-alpha-glow", color: "rgb(0, 255, 0)" },
  { id: "typegrid-beta-glow", color: "rgb(255, 0, 0)" },
  { id: "typegrid-gamma-glow", color: "rgb(0, 0, 255)" },
  { id: "typegrid-delta-glow", color: "rgb(200, 200, 0)" },
];

const SELECTED_GLOW_COLOR: FilterColor = {
  id: "typegrid-selected",
  color: "rgb(30, 180, 255)",
};

const UNSELECTED_GLOW_COLOR: FilterColor = {
  id: "typegrid-unselected",
  color: "rgb(150, 150, 150)",
};

export default function TypeGrid() {
  const [activeType, setActiveType] = useState<ActiveType>(null);
  const [touchClearAfter, setTouchClearAfter] = useState<Date>(new Date());

  useEffect(() => {
    const clearActiveType = () => {
      if (new Date() > touchClearAfter) {
        setActiveType(null);
      }
    };

    window.addEventListener("touchstart", clearActiveType, false);
    return () =>
      window.removeEventListener("touchstart", clearActiveType, false);
  });

  const squares = QUADRA_TYPES.map((quadra, quadraIndex) =>
    quadra.map((sociotype, sociotypeIndex) => (
      <TypeSquare
        key={`type-square-${sociotype.num}`}
        sociotype={sociotype}
        origin={QUADRA_COORDINATES[quadraIndex][sociotypeIndex]}
        size={SQUARE_SIZE}
        filter={
          activeType
            ? activeType === sociotype
              ? `url(#${SELECTED_GLOW_COLOR.id})`
              : `url(#${UNSELECTED_GLOW_COLOR.id})`
            : `url(#${QUADRA_COLORS[quadraIndex].id})`
        }
        activeType={activeType}
        setActiveType={setActiveType}
        setTouchClearAfter={setTouchClearAfter}
      />
    )),
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="2.0"
      viewBox={`0 0 ${GRID_EDGE} ${GRID_EDGE}`}
    >
      <defs>
        {QUADRA_COLORS.map((filterColor) =>
          createGlowFilter(filterColor, `typegrid-filter-${filterColor.id}`),
        )}
        {createGlowFilter(SELECTED_GLOW_COLOR)}
        {createGlowFilter(UNSELECTED_GLOW_COLOR)}
      </defs>

      <g
        onPointerLeave={({ pointerType }) => {
          if (pointerType === "mouse") {
            setActiveType(null);
          }
        }}
      >
        <rect
          x={SQUARE_PADDING}
          y={SQUARE_PADDING}
          width={GRID_EDGE - SQUARE_PADDING * 2}
          height={GRID_EDGE - SQUARE_PADDING * 2}
          className="fill-transparent"
        />
        {squares}
      </g>
    </svg>
  );
}

function distributeSquares({
  origin,
}: {
  origin: Coordinates;
}): readonly [Coordinates, Coordinates, Coordinates, Coordinates] {
  const paddedOrigin = [origin[0] + SQUARE_PADDING, origin[1] + SQUARE_PADDING];

  return [
    [paddedOrigin[0], paddedOrigin[1]],
    [paddedOrigin[0] + SQUARE_EDGE, paddedOrigin[1]],
    [paddedOrigin[0] + SQUARE_EDGE, paddedOrigin[1] + SQUARE_EDGE],
    [paddedOrigin[0], paddedOrigin[1] + SQUARE_EDGE],
  ];
}

function createGlowFilter({ id, color }: FilterColor, key?: string) {
  return (
    <filter key={key} id={id}>
      <feFlood floodColor={color} floodOpacity="0.3" in="SourceGraphic" />
      <feComposite operator="in" in2="SourceGraphic" />
      <feGaussianBlur stdDeviation="10" />
      <feComponentTransfer result="glow">
        <feFuncA type="linear" slope="4" intercept="0" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

"use client";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

/**
 * Google AdSense placeholder component.
 * Replace data-ad-client and data-ad-slot with real values once approved.
 */
export function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  return (
    <div className={`ad-slot overflow-hidden rounded-lg border border-dashed border-gray-800 bg-gray-900/50 ${className}`}>
      <div className="flex min-h-[90px] items-center justify-center p-4 text-xs text-gray-600">
        {/* Replace with real AdSense code after approval */}
        <span>Ad Space ({slot})</span>
      </div>
    </div>
  );
}

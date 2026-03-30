"use client";

import { useState, useRef, useEffect } from "react";
import { Check, X, ChevronUp, AlertCircle } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type SizeType = "small" | "medium" | "large";
// for changing sizes of multiSelect
const sizeClasses: Record<
  SizeType,
  {
    trigger: string;
    option: string;
    allOption: string;
    text: string;
    dividerMargin: string;
    button: string;
  }
> = {
  small: {
    trigger: "min-h-[38px] px-3 py-1.5",
    option: "px-3 py-2",
    allOption: "px-3 py-2",
    text: "text-[13px]",
    dividerMargin: "mx-3",
    button: "px-4 py-2 text-sm",
  },
  medium: {
    trigger: "min-h-[42px] px-3.5 py-2",
    option: "px-3.5 py-2.5",
    allOption: "px-3.5 py-2.5",
    text: "text-[14px]",
    dividerMargin: "mx-3.5",
    button: "px-4 py-2 text-sm",
  },
  large: {
    trigger: "min-h-[48px] px-4 py-3",
    option: "px-4 py-3.5",
    allOption: "px-4 py-3.5",
    text: "text-[15px]",
    dividerMargin: "mx-4",
    button: "px-4 py-2 text-sm",
  },
};

export default function MultiSelect({
  label,
  placeholder,
  options = OPTIONS,
  error,
}: {
  label?: string;
  placeholder?: string;
  options?: Option[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [size, setSize] = useState<SizeType>("large");
  const containerRef = useRef<HTMLDivElement>(null);

  const allSelected = selected.size === options.length;
  const someSelected = selected.size > 0;

  const currentSize = sizeClasses[size];

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(options.map((o) => o.value)));
    }
  };
  // for toggling individual options
  const toggleOption = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };
  // for clearing all selected options
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(new Set());
  };
  const sizeOptions = [
    { label: "Small", value: "small" as SizeType },
    { label: "Medium", value: "medium" as SizeType },
    { label: "Large", value: "large" as SizeType },
  ];

  const displayValue = allSelected
    ? "All selected"
    : selected.size > 0
      ? options
          .filter((o) => selected.has(o.value))
          .map((o) => o.label)
          .join(", ")
      : placeholder;

  return (
    <div className="w-full mt-20 max-w-sm font-sans" ref={containerRef}>
      <div className="flex items-center gap-2 mb-3">
        {sizeOptions.map(({ label, value }) => {
          const isActive = size === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setSize(value)}
              className={`border rounded ${currentSize.button} ${
                isActive
                  ? "bg-[#0717c9] text-white border-[#0717c9]"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="mb-1.5 text-[14px] text-[#676772] font-medium tracking-wide">
        {label}
      </p>

      <div
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center justify-between gap-2 bg-white cursor-pointer select-none transition-all duration-150 ${currentSize.trigger}
          ${
            error
              ? "border-2 border-[#D92D20]"
              : open
                ? "ring-2 ring-[#0717c9] border border-[#0717c9]"
                : "border border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <span
          className={`truncate flex-1 ${currentSize.text} ${
            someSelected ? "text-black" : "text-black"
          }`}
        >
          {displayValue}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {someSelected && (
            <button
              onClick={clearAll}
              className="text-black hover:text-gray-600 transition-colors p-0.5 rounded"
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          )}
          <span
            className={`text-black transition-transform duration-200 ${
              open ? "" : "rotate-180"
            }`}
          >
            <ChevronUp size={18} />
          </span>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-[#D92D20]">
          <AlertCircle size={20} className="shrink-0" />
          <p className={`${currentSize.text} font-medium`}>{error}</p>
        </div>
      )}

      {open && (
        <div className="mt-1 bg-white border border-gray-200 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] overflow-hidden">
          <div
            onClick={toggleAll}
            className={`flex items-center gap-3 cursor-pointer transition-colors ${currentSize.allOption}
              ${
                allSelected
                  ? "ring-2 ring-inset ring-[#0717c9] bg-[#F2F2F4]"
                  : "hover:bg-gray-50"
              }
            `}
          >
            <div
              className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 transition-colors
                ${
                  allSelected
                    ? "bg-[#0717c9]  border-[#0717c9]"
                    : "border-black bg-white"
                }
              `}
            >
              {allSelected && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 5L3.8 7.5L8.5 2.5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className={`${currentSize.text} ${allSelected ? 'text-black': 'text-[#676772]'} `}>
              All
            </span>
            {allSelected && (
              <Check size={16} className="text-black shrink-0 ml-auto" />
            )}
          </div>

          <div className="border-t border-[#cdcdd2]" />

          {options.map((option, i) => {
            const isSelected = selected.has(option.value);

            return (
              <div key={option.value}>
                <div
                  onClick={() => toggleOption(option.value)}
                  className={`flex items-center justify-between cursor-pointer transition-colors ${currentSize.option}
                    ${
                      isSelected
                        ? "ring-2 ring-inset bg-[#F2F2F4] ring-[#0717c9]"
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  <span
                    className={`${currentSize.text} ${
                      isSelected ? "text-black" : "text-[#676772]"
                    }`}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check size={16} className="text-black shrink-0" />
                  )}
                </div>

                {i < options.length - 1 && (
                  <div
                    className={`border-t border-[#cdcdd2] ${currentSize.dividerMargin}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-4 text-[14px] text-[#676772] font-medium tracking-wide">
        Optional Text Here
      </p>
    </div>
  );
}

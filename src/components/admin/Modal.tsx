"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ onClose, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="flex min-h-full items-start justify-center py-6 sm:items-center">
        <div className="relative w-full max-w-lg rounded-xl border border-[#394B39]/10 bg-white p-6 shadow-xl sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-[#394B39]/60 transition hover:bg-[#B7D8A8]/20 hover:text-[#394B39]"
          >
            <X className="h-5 w-5" />
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

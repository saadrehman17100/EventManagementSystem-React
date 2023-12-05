"use client";
import { DevTools } from "jotai-devtools";
import { Provider as JotaiProvider } from "jotai";
import React from "react";

function Provider({ children }: any) {
  return (
    <JotaiProvider>
      {children}
      <DevTools />
    </JotaiProvider>
  );
}

export default Provider;

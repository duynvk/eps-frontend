import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";

createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences theme={windmillTheme}>
        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>
);
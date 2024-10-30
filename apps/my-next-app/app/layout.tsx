"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <CssBaseline />
          {children}
        </Provider>
      </body>
    </html>
  );
}

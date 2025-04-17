"use client";
import { AppModeProvider } from "@/context/AppModeContext";
import Grid from "../grid/Grid";
import Story from "../story/Story";
import TerminalWrapper from "../terminal/TerminalWrapper";

export default function MainWrapper() {
  return (
    <>
      <Grid />
      <AppModeProvider>
        <TerminalWrapper />
        <Story />
      </AppModeProvider>
    </>
  );
}

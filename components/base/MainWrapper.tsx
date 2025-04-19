"use client";
import Grid from "../grid/Grid";
import Story from "../story/Story";
import TerminalWrapper from "../terminal/TerminalWrapper";
import { EventBridge } from "./EventBridge";
import { AppProvider } from "@/context/AppContext";
import EventDebugger from "./EventDebugger";

export default function MainWrapper() {
  return (
    <>
      <AppProvider>
        <EventDebugger />
        <Grid />
        <EventBridge />
        <TerminalWrapper />
        <Story />
      </AppProvider>
    </>
  );
}

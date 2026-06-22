import { DragDropProvider } from "@dnd-kit/react";

export type DragEndEvent = Parameters<
  NonNullable<React.ComponentProps<typeof DragDropProvider>["onDragEnd"]>
>[0];

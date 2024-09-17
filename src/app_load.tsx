import { AzureClient } from "@fluidframework/azure-client";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { appTreeConfiguration, Game } from "./schema/app_schema.js";
import { sessionTreeConfiguration } from "./schema/session_schema.js";
import { containerSchema } from "./schema/container_schema.js";
import { loadFluidData } from "./infra/fluid.js";
import { IFluidContainer } from "fluid-framework";

export async function loadApp(
  client: AzureClient,
  containerId: string,
): Promise<IFluidContainer> {
  // Initialize Fluid Container
  const { container } = await loadFluidData(
    containerId,
    containerSchema,
    client,
  );

  // Initialize the SharedTree DDSes
  const sessionTree = container.initialObjects.sessionData.viewWith(
    sessionTreeConfiguration,
  );
  if (sessionTree.compatibility.canInitialize) {
    sessionTree.initialize({ clients: [] });
  }
  const view =
    container.initialObjects.appData.viewWith(appTreeConfiguration);
  if (view.compatibility.canInitialize) {
    view.initialize("test");
  }

  // create the root element for React
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);
  const root = createRoot(app);

  // Create undo/redo stacks for the app
  // const undoRedo = createUndoRedoStacks(appTree.events);

  // Render the app - note we attach new containers after render so
  // the app renders instantly on create new flow. The app will be
  // interactive immediately.
  root.render(
    <DndProvider backend={HTML5Backend}>
      <h1>{view.root}</h1>
    </DndProvider>,
  );

  return container;
}

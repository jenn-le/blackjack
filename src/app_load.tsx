import { AzureClient } from "@fluidframework/azure-client";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createRoot } from "react-dom/client";
import { appTreeConfiguration, Deck, Hand, Player, Table } from "./schema/app_schema.js";
import { sessionTreeConfiguration } from "./schema/session_schema.js";
import { containerSchema } from "./schema/container_schema.js";
import { loadFluidData } from "./infra/fluid.js";
import { IFluidContainer } from "fluid-framework";
import { TableComponent } from "./components/table.js";

export async function loadGame(
  client: AzureClient,
  containerId: string,
): Promise<IFluidContainer> {
  // Initialize Fluid Container
  const { services, container } = await loadFluidData(
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
    view.initialize(new Table({
      players: [
        new Player({
          username: "tester",
          money: 100,
        })
      ],
      deck: new Deck({ cards: [], numberOfDecks: 2, count: 0 }),
      // TODO: make it so the dealer doesn't need to store a bet
      dealer: new Hand({ bet: 0, cards: [] })
    }));
  }

  // create the root element for React
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);
  const root = createRoot(app);

  // TODO: add a page or some way for users to specify their usernames or actually log in

  // Render the app - note we attach new containers after render so
  // the app renders instantly on create new flow. The app will be
  // interactive immediately.
  root.render(
    <DndProvider backend={HTML5Backend}>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <TableComponent 
        view={view} 
        username="tester" 
        sessionTree={sessionTree} 
        audience={services.audience} 
        container={container} />
    </DndProvider>,
  );

  return container;
}

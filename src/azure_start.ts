import { AzureClient } from "@fluidframework/azure-client";
import { loadGame } from "./app_load.js";
import { clientProps } from "./infra/clientProps.js";
import { AttachState } from "fluid-framework";

export async function anonymousAzureStart() {
  // Get the root container id from the URL
  // If there is no container id, then the app will make
  // a new container.
  let containerId = location.hash.substring(1);

  const client = new AzureClient(clientProps);

  // Load the app
  const container = await loadGame(client, containerId);

  // If the app is in a `createNew` state - no containerId, and the container is detached, we attach the container.
  // This uploads the container to the service and connects to the collaboration session.
  if (container.attachState === AttachState.Detached) {
    containerId = await container.attach();

    // The newly attached container is given a unique ID that can be used to access the container in another session
    history.replaceState(undefined, "", "#" + containerId);
  }
}

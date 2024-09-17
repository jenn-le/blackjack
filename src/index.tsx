/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { anonymousAzureStart } from "./azure_start.js";

async function start() {
  // Start the app in Azure mode
  await anonymousAzureStart();
}

start().catch((error) => console.error(error));

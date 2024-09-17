import { TreeViewConfiguration, SchemaFactory } from "fluid-framework";

// Include a UUID to guarantee that this schema will be uniquely identifiable
const sf = new SchemaFactory("d3c3249a-0934-46dd-9912-faaf39f554d3");

export class Client extends sf.object("Client", {
  clientId: sf.string,
  selected: sf.array(sf.string),
}) {}

// Define a root type.
export class Session extends sf.object("Session", {
  clients: sf.array(Client),
}) {}

// Export the tree config appropriate for this schema
// This is passed into the SharedTree when it is initialized
export const sessionTreeConfiguration = new TreeViewConfiguration({
  schema: Session,
});

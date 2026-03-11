import type { SchemaTypeDefinition } from "sanity";
import { agent } from "./schemaTypes/schemas/agent";
import { amenity } from "./schemaTypes/schemas/amenity";
import { lead } from "./schemaTypes/schemas/lead";
import { property } from "./schemaTypes/schemas/property";
import { user } from "./schemaTypes/schemas/user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [property, agent, lead, user, amenity],
};

import { SingleRelationshipField } from "payload/types";

export const createParentField = (
	relationTo: string,
	overrides?: Partial<SingleRelationshipField & {
		hasMany: false
	}>
): SingleRelationshipField => ({
	name: 'parent',
	admin: {
		position: 'sidebar',
		...(overrides?.admin || {})
	},
	// filterOptions are assigned dynamically, based on the pluginConfig
	// filterOptions: ParentFilterOptions(relationTo),
	type: 'relationship',
	maxDepth: 1,
	relationTo,
	...(overrides || {})
})
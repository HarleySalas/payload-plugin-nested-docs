import { CollectionConfig } from "payload/types";
import { PluginConfig } from "../types";

export const getParents = async (
	req: any,
	pluginConfig: PluginConfig,
	collection: CollectionConfig,
	doc: Record<string, unknown>,
	docs: Array<Record<string, unknown>> = []
): Promise<Array<Record<string, unknown>>> => {
	const parentSlug = pluginConfig?.parentFieldSlug || 'parent'
	const parent = doc[parentSlug]

	let retrievedParent;

	if (parent) {
		// if not auto-populated, and we have an ID
		if (typeof parent === 'string' || typeof parent === 'number') {
			retrievedParent = await req.payload.findByID({
				id: parent,
				collection: collection.slug,
				depth: 0,
				disableErrors: true,
				req
			})
		}

		// if auto-populated
		if (typeof parent === "object") {
			retrievedParent = parent;
		}

		if (retrievedParent) {
			if (retrievedParent[parentSlug]) {
				return getParents(req, pluginConfig, collection, retrievedParent, [
					retrievedParent,
					...docs
				])
			}

			return [retrievedParent, ...docs]
		}
	}

	return docs
}
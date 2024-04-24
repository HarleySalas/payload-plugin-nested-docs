import { CollectionConfig } from "payload/types";
import { Breadcrumb, PluginConfig } from "../types";

export const formatBreadcrumb = (
	pluginConfig: PluginConfig,
	collection: CollectionConfig,
	docs: Array<Record<string, unknown>>
): Breadcrumb => {
	let url: string | undefined = undefined;
	let label: string;

	const lastDoc = docs[docs.length -1];

	if (typeof pluginConfig?.generateURL === 'function') {
		url = pluginConfig.generateURL(docs, lastDoc)
	}

  if (typeof pluginConfig?.generateLabel === 'function') {
    label = pluginConfig.generateLabel(docs, lastDoc)
  } else {
    const useAsTitle = collection?.admin?.useAsTitle || 'id'
    label = lastDoc[useAsTitle] as string
  }

	return {
		doc: lastDoc.id as string,
		label,
		url,
	}
}
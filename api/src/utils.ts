import { createClient } from "microcms-js-sdk";

export const CMS_client = createClient({
  serviceDomain: process.env.CMS_SERVICE!,
  apiKey: process.env.CMS_API_KEY!
})
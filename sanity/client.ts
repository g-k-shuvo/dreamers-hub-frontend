import { createClient } from 'next-sanity'

export const client = createClient({
   projectId: 'yw16o87b',
   dataset: 'production',
   apiVersion: '2024-01-01',
   useCdn: false,
})

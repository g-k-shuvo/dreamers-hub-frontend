import { MetadataRoute } from 'next'
import { client } from '../sanity/client'
import { ALL_POSTS_QUERY } from '@/sanity/queries'
import { Post } from '@/utils/types'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
   const allPosts: any = await client.fetch(ALL_POSTS_QUERY)

   console.log('allPosts', allPosts)
   const allPostsEntries = allPosts?.map((post: Post) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug.current}`,
      lastPublished: post.publishedAt,
   }))

   return [
      {
         url: `${process.env.NEXT_PUBLIC_BASE_URL}/author`,
      },
      ...allPostsEntries,
   ]
}

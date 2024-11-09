import Advertisement from '@/components/organism/advertisement/Advertisement'
import BannerCard from '@/components/molecules/card/BannerCard'
import PostCard from '@/components/molecules/card/PostCard'
import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'
import { client } from '@/sanity/client'
import { FIRST_TEN_POSTS_QUERY } from '@/sanity/queries'
import { Post } from '@/utils/types'
import imageUrlBuilder from '@sanity/image-url'

export const metadata = {
   title: 'Dreamers Hub | Home',
   description: 'Dreamers Hub',
}

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
   return builder.image(source)
}

export default async function Home() {
   const firstTenPosts = await (client.fetch as any)(FIRST_TEN_POSTS_QUERY)
   const featuredOrLatestPost =
      firstTenPosts?.find((post: Post) => post?.isFeatured) || firstTenPosts[0]
   const remainingPosts = firstTenPosts?.filter(
      (post: Post) => post?._id !== featuredOrLatestPost?._id
   )

   return (
      <main className="container mx-auto">
         {/* Banner Component */}
         <section>
            <BannerCard
               featuredPost={featuredOrLatestPost as unknown as Post}
               urlFor={urlFor}
            />
         </section>

         {/* Advertisement Component */}
         <section className="pt-12">
            <Advertisement />
         </section>

         {/* Latest Post */}
         <section className="my-20">
            <h3 className="text-base-content font-bold text-2xl mb-8 font-work leading-8">
               Latest Post
            </h3>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               {(remainingPosts as unknown as Post[])?.map((item: Post) => (
                  <PostCard key={item._id} post={item} urlFor={urlFor} />
               ))}
            </div>
            <div className="flex items-center justify-center w-full mt-8">
               <Link
                  href={`/blog`}
                  className="btn btn-outline btn-secondary text-secondary-content/60 font-work font-medium text-base"
               >
                  View All Post
               </Link>
            </div>
         </section>

         {/* Advertisement Component */}
         <section className="mb-24">
            <Advertisement />
         </section>
      </main>
   )
}

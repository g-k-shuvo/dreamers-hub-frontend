import Advertisement from '@/components/organism/advertisement/Advertisement'
import PostOverlayCard from '@/components/molecules/card/PostOverlayCard'
import PostCard from '@/components/molecules/card/PostCard'
import PageInfo from '@/components/organism/pageInfo/PageInfo'
import React, { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { ALL_POSTS_QUERY } from '@/sanity/queries'
import { Post } from '@/utils/types'
import PaginatePosts from '@/components/organism/paginatedPosts/PaginatePosts'
import imageUrlBuilder from '@sanity/image-url'

export const metadata = {
   title: 'Blog Page | MetaBlog',
   description: 'Generated by create next app',
}

const AllPosts = () => {
   return (
      <main>
         <div className="container mx-auto">
            {/* Page title info */}
            <section>
               <PageInfo title="All Posts" />
            </section>

            <PaginatePosts />

            {/* All posts component */}
            {/* <section className="my-20">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {posts.map((post) => (
                     <PostCard key={post._id} post={post} urlFor={urlFor} />
                  ))}
               </div>
               <div className="flex items-center justify-center w-full mt-8">
                  <button
                     className="btn btn-outline btn-secondary font-work px-5 text-base font-medium"
                     onClick={loadMorePosts}
                     disabled={loading}
                  >
                     {loading ? 'Loading...' : 'Load More'}
                  </button>
               </div>
            </section> */}

            {/* Advertisement component */}
            <section className="mb-24">
               <Advertisement />
            </section>
         </div>
      </main>
   )
}

export default AllPosts
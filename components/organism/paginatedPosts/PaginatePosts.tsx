'use client'

import PostCard from '@/components/molecules/card/PostCard'
import PostOverlayCard from '@/components/molecules/card/PostOverlayCard'
import { client } from '@/sanity/client'
import { POSTS_BY_PAGE_QUERY, POSTS_BY_CATEGORY_QUERY } from '@/sanity/queries'
import { Post } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { mapCategory } from '@/utils/functions'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
   return builder.image(source)
}

const POSTS_PER_PAGE = 10

const PaginatePosts = ({ category }: { category?: string }) => {
   const [posts, setPosts] = useState<Post[]>([])
   const [page, setPage] = useState(1)
   const [loading, setLoading] = useState(false)
   const [totalPages, setTotalPages] = useState(0)

   const fetchPosts = async (page: number) => {
      setLoading(true)
      const start = (page - 1) * POSTS_PER_PAGE
      const end = start + POSTS_PER_PAGE

      const mappedCategories = category ? mapCategory(category) : []
      const query =
         mappedCategories.length > 0
            ? POSTS_BY_CATEGORY_QUERY
            : POSTS_BY_PAGE_QUERY
      const params =
         mappedCategories.length > 0
            ? { start, end, categories: mappedCategories }
            : { start, end }

      const newPosts = await client.fetch(query, params)
      const totalPosts = await client.fetch(
         `count(*[_type == "post" && defined(slug.current)${
            mappedCategories.length > 0 ? ' && category in $categories' : ''
         }])`,
         mappedCategories.length > 0 ? { categories: mappedCategories } : {}
      )
      setTotalPages(Math.ceil(totalPosts / POSTS_PER_PAGE))

      setPosts(newPosts)
      setLoading(false)
   }

   useEffect(() => {
      fetchPosts(page)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, category])

   const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
         setPage(newPage)
      }
   }

   return posts.length > 0 ? (
      <>
         <section className="my-12">
            <PostOverlayCard post={posts[0]} urlFor={urlFor} />
         </section>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(1, 9).map((post) => (
               <PostCard key={post._id} post={post} urlFor={urlFor} />
            ))}
         </div>

         {posts.length > 10 && (
            <div className="flex items-center justify-center w-full mt-8">
               <button
                  className="btn btn-outline btn-secondary font-work px-5 text-base font-medium"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || loading}
               >
                  Previous
               </button>
               <span className="mx-4">
                  {page} / {totalPages}
               </span>
               <button
                  className="btn btn-outline btn-secondary font-work px-5 text-base font-medium"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || loading}
               >
                  Next
               </button>
            </div>
         )}
      </>
   ) : (
      <div className="container mx-auto w-11/12 lg:w-8/12 font-work py-10 text-center">
         <p className="text-xl font-semibold leading-6">No Posts Found!</p>
      </div>
   )
}

export default PaginatePosts

'use client'

import PostCard from '@/components/molecules/card/PostCard'
import PostOverlayCard from '@/components/molecules/card/PostOverlayCard'
import { client } from '@/sanity/client'
import { POSTS_BY_PAGE_QUERY } from '@/sanity/queries'
import { Post } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
   return builder.image(source)
}

const POSTS_PER_PAGE = 10

const PaginatePosts = () => {
   const [posts, setPosts] = useState<Post[]>([])
   const [page, setPage] = useState(1)
   const [loading, setLoading] = useState(false)
   const [totalPages, setTotalPages] = useState(0)

   const fetchPosts = async (page: number) => {
      setLoading(true)
      const start = (page - 1) * POSTS_PER_PAGE
      const end = start + POSTS_PER_PAGE

      const newPosts = await client.fetch(POSTS_BY_PAGE_QUERY, {
         start,
         end,
      })
      const totalPosts = await client.fetch(
         `count(*[_type == "post" && defined(slug.current)])`
      )
      setTotalPages(Math.ceil(totalPosts / POSTS_PER_PAGE))

      setPosts(newPosts)
      setLoading(false)
   }

   useEffect(() => {
      fetchPosts(page)
   }, [page])

   const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
         setPage(newPage)
      }
   }

   return (
      <>
         <section className="my-12">
            <PostOverlayCard />
         </section>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(1, 9).map((post) => (
               <PostCard key={post._id} post={post} urlFor={urlFor} />
            ))}
         </div>
         <div className="flex items-center justify-center w-full my-8 gap-2">
            <button
               className="btn btn-outline btn-secondary font-work px-5 text-base font-medium"
               onClick={() => handlePageChange(page - 1)}
               disabled={page === 1 || loading}
            >
               Prev
            </button>
            <span className="btn  font-work px-5 text-base font-medium cursor-default">
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
      </>
   )
}

export default PaginatePosts

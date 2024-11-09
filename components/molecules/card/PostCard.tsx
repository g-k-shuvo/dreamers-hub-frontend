import { categoryMap } from '@/data/utils'
import { PostCardPropTypes } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import avatar from '@/public/avatar.png'

/**
 * Our PostCard is a reusable UI component used to display a post as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const PostCard: React.FC<PostCardPropTypes> = ({ post, urlFor }) => {
   const postImageUrl = post?.thumbnail
      ? urlFor(post.thumbnail).width(360).height(240).url()
      : null
   return (
      <div className="card w-fit p-4 border border-base-content/10 rounded-xl font-work">
         <figure>
            <Image
               src={postImageUrl || 'https://placehold.co/360x240'}
               alt={post.title}
               className={`rounded-xl`}
               width={360}
               height={240}
            />
         </figure>
         <div className="card-body py-6 px-2">
            <span className="btn no-animation hover:bg-primary hover:text-primary-content bg-primary/5 border-0 text-primary text-sm px-3 py-2 min-h-fit h-fit rounded-md w-fit capitalize font-medium">
               {categoryMap[post.category]}
            </span>
            <h3>
               <Link
                  href={`/${post.slug.current}`}
                  className="text-base-content hover:text-primary transition-all duration-300 ease-in-out font-semibold text-lg md:text-xl lg:text-2xl mt-2 line-clamp-3"
               >
                  {post.title}
               </Link>
            </h3>
            <div className="mt-5 flex items-center gap-5 text-base-content/60 ">
               <div className=" flex items-center gap-3">
                  <div className="avatar">
                     <div className="w-9 rounded-full">
                        <Image
                           src={avatar}
                           width={100}
                           height={100}
                           alt="avatar"
                        />
                     </div>
                  </div>
                  <h5>
                     <Link
                        href="/"
                        className="text-base font-medium hover:text-primary transition hover:duration-300"
                     >
                        Dreamers Hub
                     </Link>
                  </h5>
               </div>
               <p className="text-base">
                  {' '}
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                  })}
               </p>
            </div>
         </div>
      </div>
   )
}

export default PostCard

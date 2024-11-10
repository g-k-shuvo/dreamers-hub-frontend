import { categoryMap } from '@/data/utils'
import { PostOverlayPropTypes } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import avatar from '@/public/avatar.png'

/**
 * Our PostOverlayCard is a reusable UI component used to display a post as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const PostOverlayCard: React.FC<PostOverlayPropTypes> = ({ post, urlFor }) => {
   const postImageUrl = post?.thumbnail
      ? urlFor(post.thumbnail).width(1216).height(450).url()
      : null
   return (
      <div className="card relative font-work">
         {/* Card Image */}
         <figure>
            <Image
               src={postImageUrl || 'https://placehold.co/1216x450'}
               alt={post.title}
               className={`rounded-xl`}
               width={1216}
               height={450}
            />
         </figure>
         <div className="card-body p-2 md:p-10 absolute bottom-0 w-full md:w-8/12 z-20">
            <div className="w-fit text-white px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-2 md:mb-4 font-medium">
               {categoryMap[post.category]}
            </div>
            <h3>
               <Link
                  href={`/${post.slug.current}`}
                  className="text-neutral-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 hover:text-primary transition hover:duration-500"
               >
                  {post.title}
               </Link>
            </h3>
            <div className="mt-3 md:mt-6 flex items-center gap-5 text-neutral-content">
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
                        className="text-xs md:text-base font-medium hover:text-primary transition hover:duration-300"
                     >
                        Dreamers Hub
                     </Link>
                  </h5>
               </div>
               <p className=" text-xs md:text-base">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                  })}
               </p>
            </div>
         </div>

         {/*  overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
      </div>
   )
}

export default PostOverlayCard

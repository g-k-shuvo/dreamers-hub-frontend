import { categoryMap } from '@/data/utils'
import { BannerCardPropTypes } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import avatar from '@/public/avatar.png'

/**
 * Our BannerCard is a reusable UI component used to display a top section of our website
 *
 * @property featured image, a heading, author name and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const BannerCard: React.FC<BannerCardPropTypes> = ({
   featuredPost,
   urlFor,
}) => {
   const postImageUrl = featuredPost.thumbnail
      ? urlFor(featuredPost.thumbnail)?.width(1216).height(600).url()
      : null
   return (
      <div className="relative rounded-xl font-work mb-24">
         <Image
            width={1216}
            height={600}
            alt={`banner_image`}
            src={postImageUrl || 'https://placehold.co/1216x600'}
            className="rounded-xl"
         />
         <div className="absolute -bottom-16 left-4 md:left-14 rounded-xl p-4 md:p-10 bg-base-100 w-10/12 md:w-7/12 lg:w-6/12 shadow-[0_12px_24px_-6px] shadow-base-content/20">
            <div className="w-fit text-primary-content px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-4 font-medium">
               {categoryMap[featuredPost.category]}
            </div>
            <h3>
               <Link
                  href={`/${featuredPost.slug.current}`}
                  className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 hover:text-primary transition-all hover:duration-500 line-clamp-3"
               >
                  {featuredPost.title}
               </Link>
            </h3>
            <div className="mt-6 flex items-center gap-5">
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
                  <h6>
                     <Link
                        href="/author"
                        className="text-base-content/60 text-xs md:text-base font-medium hover:text-primary transition hover:duration-300"
                     >
                        Dreamers Hub
                     </Link>
                  </h6>
               </div>
               <p className="text-base-content/60 text-xs md:text-base">
                  {new Date(featuredPost.publishedAt).toLocaleDateString(
                     'en-US',
                     {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     }
                  )}
               </p>
            </div>
         </div>
      </div>
   )
}

export default BannerCard

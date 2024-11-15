import { categoryMap } from '@/data/utils'
import { client } from '../../sanity/client'
import { POST_BY_SLUG_QUERY } from '@/sanity/queries'
import avatar from '@/public/avatar.png'
import React from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from 'next-sanity'
import { PortableTextComponent } from '@/components/molecules/portableText/PortableText'
import { isValidUrl } from '@/utils/functions'
import { getFileAsset } from '@sanity/asset-utils'
import PdfShow from '@/components/molecules/pdf/PdfShow'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
   return builder.image(source)
}

export async function generateMetadata({ params }: { params: any }) {
   const { slug } = await params

   const post = await (client.fetch as any)(POST_BY_SLUG_QUERY, { slug })

   return {
      title: post.title,
      description: post.body[0].children[0].text,
      openGraph: {
         title: post.title,
         description: post.body[0].children[0].text,
         type: 'article',
         images: [
            {
               url: post.thumbnail
                  ? urlFor(post.thumbnail).width(360).height(240).url()
                  : 'https://placehold.co/360x240',
               width: 360,
               height: 240,
               alt: 'thumbnail',
            },
         ],
      },
   }
}

export default async function SinglePost({ params }: { params: any }) {
   const { slug } = await params

   const post = await (client.fetch as any)(POST_BY_SLUG_QUERY, { slug })

   const postThumbnail = post.thumbnail
      ? urlFor(post.thumbnail).width(360).height(240).url()
      : null

   return (
      <main>
         <section>
            <div className="container mx-auto px-5 md:px-0 w-full md:w-10/12 lg:w-5/12 font-work">
               <div className="py-5">
                  <div className="w-fit text-white px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-2 md:mb-4 font-medium">
                     {categoryMap[post.category]}
                  </div>
                  <h3 className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 ">
                     {post.title}
                  </h3>
                  <div className="mt-3 md:mt-6 flex items-center gap-5 text-base-content/60">
                     <div className=" flex items-center gap-3">
                        <div className="avatar">
                           <div className="w-9 rounded-full">
                              <Image
                                 width={100}
                                 height={100}
                                 src={avatar}
                                 alt="avatar"
                              />
                           </div>
                        </div>
                        <a
                           href="/"
                           className=" text-xs md:text-sm font-medium hover:text-primary transition hover:duration-300"
                        >
                           Dreamers Hub
                        </a>
                     </div>
                     <p className="text-xs md:text-sm">
                        {new Date(post.publishedAt).toLocaleDateString(
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
               <div className="mt-8">
                  <Image
                     width="800"
                     height="462"
                     alt={`blog_image`}
                     className={`rounded-xl`}
                     src={postThumbnail || 'https://placehold.co/800x462'}
                  />
               </div>

               {/* article section start  */}
               <div className="font-serif">
                  <div className="mt-8">
                     {Array.isArray(post.body) && (
                        <PortableText
                           value={post.body}
                           components={PortableTextComponent}
                        />
                     )}
                  </div>
                  <div className="mt-8">
                     {post.attachments && post.attachments.length > 0 && (
                        <div>
                           {post.attachments.map(
                              (attachment: any, index: number) => {
                                 const isImage =
                                    attachment._type === 'file' &&
                                    (attachment.asset._ref.endsWith('-jpg') ||
                                       attachment.asset._ref.endsWith('-png') ||
                                       attachment.asset._ref.endsWith(
                                          '-jpeg'
                                       ) ||
                                       attachment.asset._ref.endsWith('-webp'))

                                 const isPdf =
                                    attachment._type === 'file' &&
                                    attachment.asset._ref.endsWith('-pdf')

                                 const fileUrl = getFileAsset(
                                    attachment.asset._ref,
                                    {
                                       projectId: 'yw16o87b',
                                       dataset: 'production',
                                    }
                                 ).url

                                 return (
                                    <div key={index} className="mb-4">
                                       {isImage && (
                                          <>
                                             <Image
                                                width="800"
                                                height="462"
                                                alt={`blog_image`}
                                                className={`rounded-xl`}
                                                src={
                                                   fileUrl ||
                                                   'https://placehold.co/800x462'
                                                }
                                             />
                                             <a
                                                href={fileUrl}
                                                download
                                                target="_blank"
                                                className="mt-4 inline-block cursor-pointer text-white px-2.5 py-1 bg-blue-500 text-xs md:text-sm  mb-2 md:mb-4 font-medium font-work "
                                             >
                                                Download Image
                                             </a>
                                          </>
                                       )}

                                       {isPdf && (
                                          <>
                                             <PdfShow file={fileUrl} />

                                             <a
                                                href={fileUrl}
                                                target="_blank"
                                                download
                                                className="mt-4 inline-block cursor-pointer text-white px-2.5 py-1 bg-blue-500 text-xs md:text-sm  mb-2 md:mb-4 font-medium font-work "
                                             >
                                                Download PDF
                                             </a>
                                          </>
                                       )}
                                    </div>
                                 )
                              }
                           )}
                        </div>
                     )}
                  </div>
                  <div className="flex items-center justify-center mt-8 font-work">
                     <div className="py-4 bg-base-content/10 text-base-content/60 text-center rounded-xl w-11/12">
                        <p className="text-sm">Advertisement</p>
                        <h6 className="text-xl font-semibold leading-[24px]">
                           You can place ads
                        </h6>
                        <p className="text-lg leading-[26px]">750x100</p>
                     </div>
                  </div>
                  {post.source && (
                     <div className="my-8 flex  items-center gap-3">
                        <p className="text-base-content text-lg font-semibold">
                           Source:
                        </p>
                        {isValidUrl(post.source) ? (
                           <a
                              href={post.source}
                              className="text-[#4b6bfb]"
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              {post.source}
                           </a>
                        ) : (
                           <p className="text-base-content text-lg">
                              {post.source}
                           </p>
                        )}
                     </div>
                  )}
                  {post.otherLinks &&
                     post?.otherLinks?.length > 0 &&
                     post?.otherLinks.map((link: any, index: number) => (
                        <div
                           key={index}
                           className="my-8 flex  items-center gap-3"
                        >
                           <p className="text-base-content text-lg font-semibold">
                              {link.title}:
                           </p>
                           <a
                              href={link.url}
                              className="text-[#4b6bfb] text-lg"
                              target="_blank"
                              rel="noreferrer"
                           >
                              {link.url}
                           </a>
                        </div>
                     ))}
               </div>
            </div>
         </section>
      </main>
   )
}

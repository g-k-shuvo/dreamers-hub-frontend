export type Post = {
   _id: string
   title: string
   slug: {
      current: string
   }
   publishedAt: string // ISO date string
   thumbnail?: {
      asset: {
         _ref: string
         _type: string
      }
   }
   body?: Array<{
      _key: string
      _type: string
      children?: Array<{
         _key: string
         _type: string
         text: string
      }>
   }>
   category:
      | 'govt-jobs'
      | 'non-govt-jobs'
      | 'newspaper'
      | 'result'
      | 'admit-card'
      | 'technology'
      | 'entertainment'
      | 'others'
   isFeatured: boolean
   attachments?: Array<{
      _key: string
      _type: string
      asset: {
         _ref: string
         _type: string
      }
   }>
   totalCount?: string
   source?: string
   otherLinks?: Array<{
      title: string
      url: string
   }>
}

export interface BannerCardPropTypes {
   featuredPost: Post
   urlFor: (source: any) => string | any
}

export interface PostCardPropTypes {
   post: Post
   urlFor: (source: any) => string | any
}

export interface SinglePostPagePropTypes {
   params: {
      slug: string
   }
}

export const ALL_POSTS_QUERY = `
  *[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    thumbnail,
    body,
    category,
    isFeatured,
    attachments,
    totalCount,
    source,
    otherLinks
  }
`

export const FIRST_TEN_POSTS_QUERY = `
  *[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...10]{
    _id,
    title,
    slug,
    publishedAt,
    thumbnail,
    body,
    category,
    isFeatured,
    attachments,
    totalCount,
    source,
    otherLinks
  }
`

export const POST_BY_SLUG_QUERY = `
    *[
        _type == "post"
        && slug.current == $slug
    ][0]{
        _id,
        title,
        slug,
        publishedAt,
        thumbnail,
        body,
        category,
        isFeatured,
        attachments,
        totalCount,
        source,
        otherLinks
    }
    `

// sanity/queries.ts
export const POSTS_BY_PAGE_QUERY = `
*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  publishedAt,
  thumbnail,
  body,
  category,
  isFeatured,
  attachments,
  totalCount,
  source,
  otherLinks
}
`

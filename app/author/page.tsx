import AuthorInfo from '@/components/organism/authorInfo/AuthorInfo'
import PostCard from '@/components/molecules/card/PostCard'
import React from 'react'

export const metadata = {
   title: 'Dreamers Hub',
}

const Author = () => {
   return (
      <main>
         {/* Author info */}
         <section>
            <AuthorInfo />
         </section>
      </main>
   )
}

export default Author

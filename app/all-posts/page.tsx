import Advertisement from '@/components/organism/advertisement/Advertisement'
import PageInfo from '@/components/organism/pageInfo/PageInfo'

import PaginatePosts from '@/components/organism/paginatedPosts/PaginatePosts'

export const metadata = {
   title: 'All Posts',
}

const Posts = () => {
   return (
      <main>
         <div className="container mx-auto">
            <section>
               <PageInfo title="All Posts" />
            </section>

            <PaginatePosts />

            <section className="mb-24">
               <Advertisement />
            </section>
         </div>
      </main>
   )
}

export default Posts

import Advertisement from '@/components/organism/advertisement/Advertisement'
import PageInfo from '@/components/organism/pageInfo/PageInfo'

import PaginatePosts from '@/components/organism/paginatedPosts/PaginatePosts'
import { toTitleCase } from '@/utils/functions'

export async function generateMetadata({ params }: { params: any }) {
   const { category } = await params

   return {
      title:
         category === 'admit-and-result'
            ? 'Admit/Result'
            : toTitleCase(category),
   }
}
export default async function CategoryPosts({ params }: { params: any }) {
   const { category } = await params

   const titleCaseCategory =
      category === 'admit-and-result' ? 'Admit/Result' : toTitleCase(category)

   return (
      <main>
         <div className="container mx-auto">
            <section>
               <PageInfo title={titleCaseCategory} />
            </section>

            <PaginatePosts category={category} />

            <section className="mb-24">
               <Advertisement />
            </section>
         </div>
      </main>
   )
}

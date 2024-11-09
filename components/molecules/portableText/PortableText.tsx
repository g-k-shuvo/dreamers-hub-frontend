import { PortableText } from 'next-sanity'
import { PortableTextComponents } from '@portabletext/react'
import { ReactElement, JSXElementConstructor, ReactFragment, Key } from 'react'

export const PortableTextComponent: PortableTextComponents = {
   types: {
      block: ({ value }) => {
         switch (value.style) {
            case 'h1':
               return (
                  <h1 className="text-4xl leading-7 text-base-content font-semibold mt-8 mb-4">
                     {value.children[0].text}
                  </h1>
               )
            case 'h2':
               return (
                  <h2 className="text-3xl leading-7 text-base-content font-semibold mt-8 mb-4">
                     {value.children[0].text}
                  </h2>
               )
            case 'h3':
               return (
                  <h3 className="text-2xl leading-7 text-base-content font-semibold mt-8 mb-4">
                     {value.children[0].text}
                  </h3>
               )
            case 'h4':
               return (
                  <h4 className="text-xl leading-7 text-base-content font-semibold mt-8 mb-4">
                     {value.children[0].text}
                  </h4>
               )
            case 'h5':
               return (
                  <h5 className="text-lg leading-7 text-base-content font-semibold mt-8 mb-4">
                     {value.children[0].text}
                  </h5>
               )
            case 'h6':
               return (
                  <h6 className="text-md leading-7 text-base-content font-semibold mt-8 mb-4">
                     {value.children[0].text}
                  </h6>
               )
            case 'blockquote':
               return (
                  <div className="p-8 bg-base-200 rounded-xl border-l-4 border-base-content/10 my-8">
                     <p className="text-base-content italic text-2xl">
                        {`“ ${value.children[0].text} ”`}
                     </p>
                  </div>
               )
            case 'normal':
               return value.children.map(
                  (
                     child: {
                        marks: string | any[]
                        text:
                           | string
                           | number
                           | boolean
                           | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                             >
                           | ReactFragment
                           | null
                           | undefined
                        href: string | undefined
                     },
                     index: Key | null | undefined
                  ) => {
                     if (child.marks && child.marks.length > 0) {
                        switch (child.marks[0]) {
                           case 'strong':
                              return (
                                 <span
                                    key={index}
                                    className="font-bold text-base-content/80"
                                 >
                                    {child.text}
                                 </span>
                              )
                           case 'em':
                              return (
                                 <span
                                    key={index}
                                    className="italic text-base-content/80"
                                 >
                                    {child.text}
                                 </span>
                              )
                           case 'underline':
                              return (
                                 <span
                                    key={index}
                                    className="underline text-base-content/80"
                                 >
                                    {child.text}
                                 </span>
                              )
                           case 'code':
                              return (
                                 <div className="p-8 bg-base-200 rounded-xl border-l-4 border-base-content/10 my-8">
                                    <p className="text-base-content text-xl">
                                       {child.text}
                                    </p>
                                 </div>
                              )

                           case 'strike-through':
                              return (
                                 <span
                                    key={index}
                                    className="line-through text-base-content/80"
                                 >
                                    {child.text}
                                 </span>
                              )

                           case 'link':
                              return (
                                 <a
                                    href={child.href}
                                    key={index}
                                    className=" text-base-content/80"
                                 >
                                    {child.text}
                                 </a>
                              )

                           default:
                              return null
                        }
                     } else {
                        return null
                     }
                  }
               )
            default:
               return (
                  <p className="text-xl leading-8 text-base-content/80 my-4">
                     {value.children[0].text}
                  </p>
               )
         }
      },
   },
}

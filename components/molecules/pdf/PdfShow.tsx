'use client'

import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import './PdfShow.css'

import type { PDFDocumentProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
   'pdfjs-dist/build/pdf.worker.min.mjs',
   import.meta.url
).toString()

const options = {
   cMapUrl: '/cmaps/',
   standardFontDataUrl: '/standard_fonts/',
}

const resizeObserverOptions = {}

const maxWidth = 800

interface PdfShowPropTypes {
   file: string
}

const PdfShow: React.FC<PdfShowPropTypes> = ({ file }) => {
   const [numPages, setNumPages] = useState<number>()
   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
   const [containerWidth, setContainerWidth] = useState<number>()

   const onResize = useCallback<ResizeObserverCallback>((entries) => {
      const [entry] = entries

      if (entry) {
         setContainerWidth(entry.contentRect.width)
      }
   }, [])

   useResizeObserver(containerRef, resizeObserverOptions, onResize)

   function onDocumentLoadSuccess({
      numPages: nextNumPages,
   }: PDFDocumentProxy): void {
      setNumPages(nextNumPages)
   }

   return (
      <div className="Example">
         <div className="Example__container">
            <div className="Example__container__document" ref={setContainerRef}>
               <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={options}
               >
                  {Array.from(new Array(numPages), (_el, index) => (
                     <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={
                           containerWidth
                              ? Math.min(containerWidth, maxWidth)
                              : maxWidth
                        }
                     />
                  ))}
               </Document>
            </div>
         </div>
      </div>
   )
}

export default PdfShow

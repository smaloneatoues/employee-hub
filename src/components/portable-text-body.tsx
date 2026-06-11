import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/lib/sanity"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-8 text-xl font-semibold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 text-lg font-semibold tracking-tight">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc pl-6 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal pl-6 space-y-1">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1200).url()}
        alt=""
        className="my-6 w-full rounded-xl"
      />
    ),
  },
}

export function PortableTextBody({ value }: { value: unknown[] }) {
  return (
    <div className="text-[15px] text-foreground">
      <PortableText value={value as never} components={components} />
    </div>
  )
}

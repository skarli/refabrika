"use client";

import { PortableText as SanityPortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "./image";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).quality(85).url()}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code className={`language-${value.language || "text"}`}>
            {value.code}
          </code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = value.blank ? "_blank" : undefined;
      const rel = value.blank ? "noopener noreferrer" : undefined;

      return (
        <Link
          href={value.href}
          target={target}
          rel={rel}
          className="text-primary underline hover:no-underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
};

interface PortableTextProps {
  value: any;
  className?: string;
}

export function PortableText({ value, className = "" }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className={`portable-text ${className}`}>
      <SanityPortableText value={value} components={components} />
    </div>
  );
}

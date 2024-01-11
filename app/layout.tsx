import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { Metadata } from 'next';

import { getCategories } from '#/app/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';

export const metadata: Metadata = {
  title: 'Nested Layouts | Next.js App Router',
  description:
    'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
  openGraph: {
    title: 'Nested Layouts',
    description:
      'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
    images: [`/api/og?title=Nested Layouts`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="flex justify-between">
              <TabGroup
                path=""
                items={[
                  {
                    text: 'Home',
                    slug: '/',
                  },
                  ...categories.map((x) => ({
                    text: x.name,
                    slug: x.slug,
                  })),
                ]}
              />

              <div className="self-start">
                <ClickCounter />
              </div>
            </div>
            <div className="space-y-9">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

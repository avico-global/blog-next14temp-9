import React from "react";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import AllArticles from "@/components/AllArticles";
import Head from "next/head";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";

export default function blog({
  logo,
  blog_list,
  imagePath,
  categories,
  domain,
  meta,
  contact_details,
  banner,
  favicon,
  nav_type,
  footer_type,
}) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>
      <Navbar
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        nav_type={nav_type}
        contact_details={contact_details}
      />

      <h1 className=" text-white text-6xl  font-bold text-center pt-44">
        Blogs
      </h1>

      <AllArticles
        className=" pt-12 px-4 mb-6 "
        articles={blog_list}
        imagePath={imagePath}
      />

      <Footer
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        footer_type={footer_type}
      />

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/`,
              url: `https://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
            },
            {
              "@type": "Organization",
              "@id": `https://${domain}`,
              name: domain,
              url: `https://${domain}`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "https://www.facebook.com",
                "https://www.twitter.com",
                "https://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `https://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog?.title,
                },
              })),
            },
          ],
        }}
      />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const meta = await callBackendApi({ domain, type: "meta_home" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  robotsTxt({ domain });

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      banner: banner?.data[0] || null,
      meta: meta?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      nav_type: nav_type?.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      copyright: copyright?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      categories: categories?.data[0]?.value || null,
      footer_type: footer_type?.data[0]?.value || {},
      contact_details: contact_details?.data[0]?.value || null,
    },
  };
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "@/components/containers/Footer";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useBreadcrumbs from "@/lib/useBreadcrumbs";

// Font
import { Raleway } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/containers/Navbar";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Categories({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  contact_details,
  favicon,
  layout,
  tag_list,
  nav_type,
  footer_type,
}) {
  const router = useRouter();
  const { category } = router.query;

  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = sanitizeUrl(category);
    // console.log("Search Content:", searchContent);
    // console.log("Item category:", sanitizeUrl(item.article_category));

    return sanitizeUrl(item.article_category) === searchContent;
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  const page = layout?.find((page) => page.page === "category");

  return (
    <div className={cn(myFont.className, "flex flex-col min-h-screen")}>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title?.replaceAll(
            "##category##",
            category?.replaceAll("-", " ")
          )}
        </title>
        <meta
          name="description"
          content={meta?.description.replaceAll(
            "##category##",
            category?.replaceAll("-", " ")
          )}
        />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/${category}`} />
        {/* <meta name="robots" content="noindex" /> */}
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

      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;
            switch (item.section?.toLowerCase()) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    logo={logo}
                    nav_type={nav_type}
                    category={category}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );

              case "search result":
                return (
                  <div
                    key={index}
                    className="mb-12 mt-52 px-4 mx-auto max-w-[1500px] "
                  >
                    <div className="grid  gap-12 w-full">
                      <div>
                        <p className="text-secondary font-bold">
                          You are viewing
                        </p>
                        <h1 className="text-5xl text-white font-bold   capitalize  py-1 mb-7 w-full">
                          {category?.replaceAll("-", " ")}
                        </h1>

                        <div className=" flex flex-col lg:flex-row gap-3 lg:gap-6 mb-10">
                          {categories?.map((item, index) => (
                            <Link
                              key={index}
                              title={item?.title || "Article Link"}
                              href={`/${sanitizeUrl(item.title)}`}
                              className={cn(
                                "uppercase text-lg font-bold text-white hover:border-b transition-all",
                                category === item.title && "text-secondary"
                              )}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>

                        {filteredBlogList?.length > 0 ? (
                          ""
                        ) : (
                          <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                            No articles found related to {category}
                          </div>
                        )}
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 ">
                          {filteredBlogList.map((item, index) => (
                            <div key={index}>
                              <Link
                                title={item?.title || "Article Link"}
                                href={`/${sanitizeUrl(
                                  item.article_category
                                )}/${sanitizeUrl(item?.title)}`}
                              >
                                <div className="overflow-hidden relative min-h-40 rounded lg:min-h-52 w-full bg-black flex-1">
                                  <Image
                                    title={item?.title || item.imageTitle}
                                    src={
                                      item.image
                                        ? `${imagePath}/${item.image}`
                                        : "/no-image.png"
                                    }
                                    fill={true}
                                    loading="lazy"
                                    alt="blog"
                                    className="w-full h-full object-cover top-0 hover:scale-125 transition-all"
                                  />
                                </div>
                              </Link>
                              <Link
                                className=" flex justify-start "
                                href={`/${sanitizeUrl(category)}`}
                              >
                                <Badge className="mt-4 inline-block text-white  ">
                                  {category}
                                </Badge>
                              </Link>
                              <Link
                                title={item?.title || "Article Link"}
                                href={`/${sanitizeUrl(
                                  item.article_category
                                )}/${sanitizeUrl(item?.title)}`}
                              >
                                <p className="font-bold text-3xl lg:text-5xl text-start my-4 text-secondary transition-colors">
                                  {item.title}
                                </p>
                              </Link>
                              <div className="flex items-center gap-2 mt-2">
                                <p className="text-sm  text-gray-400 font-semibold">
                                  <span className="text-gray-200 text-sm">
                                    By
                                  </span>
                                  : {item.author}
                                </p>
                                <span className="text-gray-400">--</span>
                                <p className="text-sm text-gray-200 font-semibold">
                                  {dayjs(item?.published_at)?.format(
                                    "MMM D, YYYY"
                                  )}
                                </p>
                              </div>
                              <p className="text-gray-200 mt-4 mb-12">
                                {item.tagline}
                              </p>

                              <Link
                                href={`/${sanitizeUrl(category)}/${sanitizeUrl(
                                  item?.title
                                )}`}
                                className="  font-bold text-secondary border-2 border-secondary  rounded-full p-6 hover:bg-secondary hover:text-white "
                              >
                                Continue Reading
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              case "footer":
                return (
                  <Footer
                    logo={logo}
                    key={index}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    category={category}
                    footer_type={footer_type}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "WebSite",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${sanitizeUrl(
                    blog?.article_category.replaceAll(" ", "-")
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const banner = await callBackendApi({ domain, query, type: "banner" });
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_category" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      layout: layout?.data[0]?.value || null,
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}

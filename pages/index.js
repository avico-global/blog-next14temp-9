import React from "react";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Banner from "@/components/containers/Banner/Banner";
import MostPopular from "@/components/containers/MostPopular";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import AllArticles from "@/components/AllArticles";
import Categories from "@/components/Categories";
import Link from "next/link";
import Head from "next/head";

export default function index({
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
        key={index}
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        nav_type={nav_type}
        contact_details={contact_details}
      />
      <Banner
        key={index}
        data={banner.value}
        image={`${imagePath}/${banner?.file_name}`}
        blog_list={blog_list}
        imagePath={imagePath}
      />

      {blog_list?.length > 0 && (
        <div className="border-t flex lg:hidden border-white/20 bg-black/30 backdrop-blur-md py-8  bottom-0 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 md:mx-8 lg:mx-20">
            {blog_list
              ?.slice(-3)
              .reverse()
              .map((item, index) => (
                <BlogCard
                  title={item?.title}
                  key={index}
                  {...item}
                  href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                    item?.title
                  )}`}
                />
              ))}
          </div>
        </div>
      )}

      <MostPopular key={index} blog_list={blog_list} imagePath={imagePath} />
      <AllArticles
        heading={"Latest Articles"}
        articles={blog_list}
        imagePath={imagePath}
      />
      <Categories categories={categories} imagePath={imagePath} />

      <Footer
        key={index}
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        footer_type={footer_type}
      />
    </>
  );
}

function BlogCard({
  title,
  article_category,
  image,
  href,
  imageTitle,
  altImage,
  tagline,
  date,
  author,
}) {
  return (
    <div className="group hover:bg-white/10 rounded-lg backdrop-blur-sm p-5 transition-all duration-300">
      <div className="flex flex-col space-y-3">
        <Link
          title={article_category || "Article Category"}
          href={`/${sanitizeUrl(article_category)}`}
          className="text-white/80 text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors"
        >
          {article_category}
        </Link>

        <Link
          title={title}
          href={href || ""}
          className="text-xl md:text-2xl font-bold text-white  decoration-2 underline-offset-2 line-clamp-2"
        >
          {title}
        </Link>

        <div className="flex items-center justify-between mt-4">
          {author && <span className="text-white/70 text-sm">{author}</span>}
          <p className="text-white/70 text-sm">{date}</p>
        </div>
      </div>
    </div>
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

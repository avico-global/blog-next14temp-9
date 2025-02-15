import React from "react";
import Head from "next/head";

import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Map from "@/components/containers/Map";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Font
import { Raleway } from "next/font/google";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JsonLd from "@/components/json/JsonLd";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Contact({
  logo,
  imagePath,
  blog_list,
  categories,
  contact_details,
  meta,
  domain,
  layout,
  favicon,
  nav_type,
  footer_type,
}) {
  const page = layout?.find((item) => item.page === "contact");
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/contact`} />
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
            switch (item.section) {
              case "navbar":
                return (
                  <Navbar
                    logo={logo}
                    nav_type={nav_type}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );

              case "contact info":
                return (
                  <div className="py-20 bg-gradient-to-b">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="flex justify-center">
                        <div className="w-full max-w-5xl p-8 md:p-16">
                          <h1 className="text-4xl font-bold text-white mb-10">
                            Contact us
                          </h1>
                          <form className="space-y-8 w-full">
                            {/* Name Fields in Flex */}
                            <div className="flex gap-6">
                              <div className="relative flex-1 w-full">
                                <label
                                  htmlFor="firstName"
                                  className="block text-sm font-semibold text-white mb-2"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  id="firstName"
                                  name="firstName"
                                  className="w-full px-4 py-4 rounded-full border-2 border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all duration-200 bg-transparent text-white"
                                  required
                                />
                              </div>

                              <div className="relative flex-1 w-full">
                                <label
                                  htmlFor="lastName"
                                  className="block text-sm font-semibold text-white mb-2"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  id="lastName"
                                  name="lastName"
                                  className="w-full px-4 py-4 rounded-full border-2 border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all duration-200 bg-transparent text-white"
                                  required
                                />
                              </div>
                            </div>

                            {/* Email and Phone in one line */}
                            <div className="flex gap-6">
                              <div className="relative flex-1 w-full">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-semibold text-white mb-2"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="w-full px-4 py-4 rounded-full border-2 border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all duration-200 bg-transparent text-white"
                                  required
                                />
                              </div>

                              <div className="relative flex-1 w-full">
                                <label
                                  htmlFor="phone"
                                  className="block text-sm font-semibold text-white mb-2"
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  className="w-full px-4 py-4 rounded-full border-2 border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all duration-200 bg-transparent text-white"
                                  required
                                />
                              </div>
                            </div>

                            <div className="relative">
                              <label
                                htmlFor="message"
                                className="block text-sm font-semibold text-white mb-2"
                              >
                                Your Message
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="w-full px-4 py-4 rounded-3xl  border-2  border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all duration-200 bg-transparent text-white resize-none"
                                required
                              />
                            </div>

                            <div className="mt-8">
                              <button
                                type="submit"
                                className="w-36 rounded-full border-2 border-secondary  text-secondary hover:bg-secondary hover:text-white px-4 py-3 font-semibold text-base focus:outline-none focus:ring-4 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
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
              "@type": "WebPage",
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
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
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
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_contact" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0],
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0]?.value || null, 
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}

import React from "react";
import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  // States
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // useEffect hooks
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // Functions

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary, url: "" };

      const updatedArticles = [newArticle, ...allArticles];

      setArticle(newArticle);

      console.log(newArticle);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      setAllArticles(updatedArticles);
    }
    // setArticle({ ...article, url: "" });
  };

  // Copy function
  const handleCopy = (url) => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn
          peer-focus:border-slate-500
          peer-focus:text-slate-700
          "
          >
            ↵
          </button>
        </form>

        {/* Browse URL Histories */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          <h5 className="text-slate-700 text-xl">History</h5>
          {allArticles.map((item, idx) => (
            <div
              key={`link-${idx}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy-article"
                  className="w-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-hind text-blue-500 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 max-w-full justify-center items-center flex">
        {isFetching ? (
          <img
            src={loader}
            alt="Loading..."
            className="w-20 h-20 mx-auto object-contain"
            style={{ filter: "invert(1)" }}
          />
        ) : error ? (
          <p className="font-hind font-bold text-slate-700 text-center">
            That URL was't supported, Please enter supported URL.
            <br />
            <span className="font-mooli font-normal text-slate-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-4">
              <h2 className="font-mooli font-bold text-slate-700 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-hind text-xl text-center leading-7">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;

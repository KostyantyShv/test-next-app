import { useState } from "react";
import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { articlesMock } from "./mock";

const ArticlesCard: React.FC<{ id: string }> = ({ id }) => {
  const [showAll, setShowAll] = useState(false);

  const initialArticles = articlesMock.slice(1, 4);
  const additionalArticles = articlesMock.slice(4);

  return (
    <CardWrapper id={id}>
      <div className="section-header flex justify-between items-center mb-6">
        <h2 className="section-title text-[#1B1B1B] text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[3px] after:bg-[#016853]">
          Featured Articles
        </h2>
      </div>

      <FeaturedArticle article={articlesMock[0]} />

      <div className="articles-grid grid grid-cols-1 gap-3 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {initialArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      <div
        className={`articles-grid grid grid-cols-1 gap-3 mb-8 md:grid-cols-2 lg:grid-cols-3 ${
          !showAll ? "hidden" : ""
        }`}
      >
        {additionalArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      <button
        className="view-more-btn w-full py-[14px] bg-white text-[#346DC2] text-base font-medium text-center border border-[#E0E0E0] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#EBFCF4] hover:text-[#016853] hover:border-[#016853]"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "SHOW LESS" : "VIEW ALL ARTICLES"}
      </button>
    </CardWrapper>
  );
};

export default ArticlesCard;

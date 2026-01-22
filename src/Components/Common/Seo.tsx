import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string | string[];
  keywords?: string;
}

const Seo = ({ title, description, keywords }: SeoProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      const content = Array.isArray(description) ? description.join(", ") : description;
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement("meta");
        descriptionTag.setAttribute("name", "description");
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.setAttribute("content", content);
    }

    if (keywords) {
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.setAttribute("name", "keywords");
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute("content", keywords);
    }
  }, [title, description, keywords]);

  return null;
};

export default Seo;

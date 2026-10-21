import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string | string[];
  keywords?: string;
  noIndex?: boolean;
  robots?: string;
}

const Seo = ({ title, description, keywords, noIndex, robots }: SeoProps) => {
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

    const robotsContent = robots || (noIndex ? "noindex" : undefined);
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsContent) {
      if (!robotsTag) {
        robotsTag = document.createElement("meta");
        robotsTag.setAttribute("name", "robots");
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute("content", robotsContent);
    } else if (robotsTag) {
      robotsTag.remove();
    }

    return () => {
      if (robotsContent) {
        const currentRobots = document.querySelector('meta[name="robots"]');
        if (currentRobots) {
          currentRobots.remove();
        }
      }
    };
  }, [title, description, keywords, noIndex, robots]);

  return null;
};

export default Seo;

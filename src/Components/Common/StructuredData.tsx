import React from "react";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a JSON string, not an object
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;



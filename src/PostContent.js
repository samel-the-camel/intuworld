import React, { useState, useEffect } from 'react';

const PostContent = ({ post }) => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(`./mockData/${post}.json`);
        setContent(module.default);
        setError(null);
      } catch (err) {
        console.error('Error loading post:', err);
        setError(`Error loading post: ${err.message}`);
      }
    };

    loadContent();
  }, [post]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (error) return <div className="error">{error}</div>;
  if (!content) return <div>Loading...</div>;

  return (
    <div className="post-content">
      <h2>{content.title}</h2>
      <p>Date: {content.date}</p>
      {content.sections.map((section, index) => (
        <div key={index} className="post-section">
          <h3 onClick={() => toggleSection(index)}>{section.title}</h3>
          {expandedSections[index] && <div dangerouslySetInnerHTML={{ __html: section.content }} />}
        </div>
      ))}
    </div>
  );
};

export default PostContent;
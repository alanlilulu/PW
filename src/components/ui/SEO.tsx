import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = '个人作品展示网站',
  description = '展示戏剧作品、肖像摄影和职业经历的综合性个人网站',
  keywords = '戏剧,摄影,作品展示,个人网站',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  author = '网站作者'
}) => {
  return (
    <Helmet>
      {/* 基本meta标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* 其他重要meta标签 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="zh-CN" />
      <meta name="revisit-after" content="7 days" />
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": author,
          "description": description,
          "url": url,
          "sameAs": [
            "https://github.com/yourusername",
            "https://linkedin.com/in/yourusername"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;


const WORDPRESS_API_URL = 'https://astrostarterkit.42web.io/wordpress/wp-json/wp/v2/posts';

export async function getAllPosts(limit = 6) {
  const response = await fetch(
    `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed`
  );
  const posts = await response.json();

  return posts.map(post => ({
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    date: post.date,
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    imageWidth: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.width || 800,
    imageHeight: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.height || 600,
    readingTime: calculateReadingTime(post.content.rendered),
  }));
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}
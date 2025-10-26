const WORDPRESS_API_URL = 'https://public-api.wordpress.com/wp/v2/sites/startertestjerem.wordpress.com';

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
    // Récupération de l'image mise en avant
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    // Dimensions de l'image
    imageWidth: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.width || 800,
    imageHeight: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.height || 600,
  }));
}
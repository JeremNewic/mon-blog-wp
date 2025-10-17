const WORDPRESS_API_URL = `${import.meta.env.PUBLIC_WORDPRESS_URL}/wp-json/wp/v2`;

export async function getAllPosts(limit = 6) {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: post.excerpt.rendered,
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      date: new Date(post.date).toLocaleDateString('fr-FR'),
      content: post.content.rendered
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    return [];
  }
}
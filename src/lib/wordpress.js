const WORDPRESS_API_URL = import.meta.env.PUBLIC_WP_API_URL || 'https://astrostarterkit.42web.io/wordpress/wp-json/wp/v2/posts';

export async function getAllPosts(limit = 6) {
  try {
    console.log('Tentative de récupération depuis:', `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed`);
    
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed`
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const posts = await response.json();
    
    console.log('Type de données reçues:', typeof posts);
    console.log('Posts reçus:', posts);

    // Vérifier si posts est un tableau
    if (!Array.isArray(posts)) {
      console.error('L\'API n\'a pas retourné un tableau:', posts);
      return [];
    }

    return posts.map(post => ({
      id: post.id,
      title: post.title?.rendered || post.title || 'Sans titre',
      slug: post.slug || 'article',
      excerpt: post.excerpt?.rendered || post.excerpt || '',
      date: post.date || '',
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      imageWidth: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.width || 800,
      imageHeight: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.height || 600,
      readingTime: calculateReadingTime(post.content?.rendered || post.excerpt?.rendered || ''),
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    return [];
  }
}

function calculateReadingTime(content) {
  if (!content) return '1 min';
  
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]*>/g, '');
  const words = plainText.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute) || 1;
  return `${minutes} min`;
}
function renderPosts(containerId, maxPosts, basePath = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const selected = maxPosts ? posts.slice(0, maxPosts) : posts;
  container.innerHTML = selected.map(post => `
    <a class="resource-card" href="${basePath}${post.url}">
      <img src="${post.image}" alt="${post.title}">
      <div>
        <h4>${post.title}</h4>
        <p>${post.excerpt}</p>
      </div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts('latest-posts', 3, 'blog/');
  renderPosts('blog-container');
});

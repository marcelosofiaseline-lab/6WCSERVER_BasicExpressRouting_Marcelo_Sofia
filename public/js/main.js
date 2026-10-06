// Dynamic frontend integration via fetch()
async function fetchMenu(category = '') {
  const container = document.getElementById('menu-container');
  if (!container) return;

  const url = category ? `/api/menu?category=${category}` : '/api/menu';

  try {
    const response = await fetch(url);
    const data = await response.json();

    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p class="price">$${item.price.toFixed(2)}</p>
        <p>${item.description}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p>Failed to load menu items.</p>';
    console.error('Error fetching menu:', err);
  }
}

// Initial fetch on page load for menu.html
if (document.getElementById('menu-container')) {
  fetchMenu();
}
//NAME: MARCELO, SOFIA SELINE S.
//SECTION: WD-303

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const menuItems = [
  { id: 1, name: 'Espresso', category: 'hot', price: 3.50, description: 'Rich and bold single shot' },
  { id: 2, name: 'Iced Americano', category: 'cold', price: 4.00, description: 'Espresso poured over iced water' },
  { id: 3, name: 'Caramel Macchiato', category: 'cold', price: 5.25, description: 'Espresso, steamed milk, and rich caramel syrup' },
  { id: 4, name: 'Matcha Latte', category: 'hot', price: 4.75, description: 'Japanese ceremonial green tea with steamed oat milk' },
  { id: 5, name: 'Cold Brew', category: 'cold', price: 4.50, description: 'Slow-steeped for 20 hours for ultra-smooth taste' }
];

const requestLogger = (req, res, next) => {
  console.log(`[LOG] Page/Route Visited: ${req.originalUrl} - Method: ${req.method} - Time: ${new Date().toLocaleTimeString()}`);
  next();
};

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
    return res.json(filtered);
  }
  res.json(menuItems);
});

app.get('/api/menu/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = menuItems.find(i => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Coffee item not found' });
  }
  res.json(item);
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><p>The coffee you are looking for has spilled!</p>');
});

app.listen(PORT, () => {
  console.log(`☕ Brew & Bean Cafe Server running on http://localhost:${PORT}`);
});
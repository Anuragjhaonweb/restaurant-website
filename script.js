// Page routing and content loading
document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('header nav a');
  
  // Function to load content
  function loadContent(pageId) {
    const content = document.getElementById(`${pageId}-content`);
    if (content) {
      mainContent.innerHTML = content.innerHTML;
      
      // Add fade-up animations
      setTimeout(() => {
        const fadeElements = mainContent.querySelectorAll('.fade-up');
        fadeElements.forEach(el => {
          el.classList.add('appear');
        });
      }, 100);
      
      // Initialize menu filtering
      if (pageId === 'menu') {
        setupMenuFilter();
      }
    }
  }
  
  // Load home page by default
  loadContent('home');
  
  // Navigation click events
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('href').substring(1);
      loadContent(pageId);
      
      // Update URL
      history.pushState(null, '', `#${pageId}`);
    });
  });
  
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const pageId = window.location.hash.substring(1) || 'home';
    loadContent(pageId);
  });
  
  // Menu filtering functionality
  function setupMenuFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const menuItems = document.querySelectorAll('.dish-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        button.classList.add('filter-active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter menu items
        menuItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  // Role switcher logic
  const roleSelect = document.getElementById('roleSelect');
  if (roleSelect) {
    roleSelect.addEventListener('change', applyRole);
    applyRole(); // initial
  }

  function applyRole() {
    const role = roleSelect ? roleSelect.value : 'superadmin';
    const navLinks = document.querySelectorAll('#main-nav a[data-role]');
    navLinks.forEach(a => {
      const allowed = a.getAttribute('data-role');
      if (allowed === 'all' || allowed === role) {
        a.style.display = 'flex';
      } else {
        a.style.display = 'none';
      }
    });

  
    const dashboardHeading = document.querySelector('.content h2');
    if (dashboardHeading) {
      dashboardHeading.textContent = capitalize(role) + ' Dashboard';
    }
  }

  function capitalize(s) { 
    return s.charAt(0).toUpperCase() + s.slice(1); 
  }

  // Initialize charts if they exist
  if (document.getElementById('barChart') || document.getElementById('lineChart')) {
    // Wait for Chart.js to load if needed
    if (typeof Chart === 'undefined') {
      // Chart.js will load and call initCharts() via onload
      window.initCharts = createCharts;
    } else {
      // Chart.js already loaded, create charts directly
      createCharts();
    }
  }

  function createCharts() {
    // Chart: Monthly Income vs Expense (bar)
    const barCanvas = document.getElementById('barChart');
    if (barCanvas) {
      const barCtx = barCanvas.getContext('2d');
      if (barCtx) {
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun'],
            datasets: [
              { 
                label: 'Expense', 
                data: [30,70,90,50,40,60], 
                backgroundColor: 'rgba(85,85,85,0.9)' 
              },
              { 
                label: 'Income', 
                data: [50,60,120,80,100,90], 
                backgroundColor: 'rgba(217,183,59,0.95)' 
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { 
                display: false 
              } 
            },
            scales: {
              x: { 
                grid: { 
                  display: false 
                } 
              },
              y: { 
                beginAtZero: true 
              }
            }
          }
        });
      }
    }

    // Chart: Member Growth (line)
    const lineCanvas = document.getElementById('lineChart');
    if (lineCanvas) {
      const lineCtx = lineCanvas.getContext('2d');
      if (lineCtx) {
        new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun'],
            datasets: [{
              label: 'Members',
              data: [1000,1020,1060,1100,1150,1200],
              borderColor: 'rgba(217,183,59,0.95)',
              backgroundColor: 'rgba(217,183,59,0.08)',
              tension: 0.3,
              pointRadius: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { 
                display: false 
              } 
            },
            scales: {
              x: { 
                grid: { 
                  display: false 
                } 
              },
              y: { 
                beginAtZero: false 
              }
            }
          }
        });
      }
    }
  }
});
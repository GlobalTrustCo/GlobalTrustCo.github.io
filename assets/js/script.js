document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const viewToggle = document.querySelector('.view-toggle');
    const toggleText = document.querySelector('.toggle-text');

    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // PC/移动端视图切换
    let isMobileView = window.innerWidth <= 768;
    
    window.toggleView = function() {
        isMobileView = !isMobileView;
        document.body.classList.toggle('mobile-view', isMobileView);
        
        if (toggleText) {
            toggleText.textContent = isMobileView ? 'PC 端' : '移动端';
        }
        
        // 更新视图
        updateView();
    };

    function updateView() {
        if (isMobileView) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }

    // 窗口大小改变时自动切换视图
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const width = window.innerWidth;
            if (width <= 768 && !isMobileView) {
                isMobileView = true;
                updateView();
                if (toggleText) {
                    toggleText.textContent = 'PC 端';
                }
            } else if (width > 768 && isMobileView) {
                isMobileView = false;
                updateView();
                if (toggleText) {
                    toggleText.textContent = '移动端';
                }
            }
        }, 200);
    });

    // 平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

import { DashboardModule } from './modules/dashboard.js';
import { ListeningModule } from './modules/listening.js';

class App {
    constructor() {
        this.appContent = document.getElementById('content-area');
        this.navItems = document.querySelectorAll('.nav-item');
        
        // Cấu hình routes
        this.modules = {
            'dashboard': DashboardModule,
            'listening': ListeningModule,
            // Chúng ta có thể thêm các module khác ở đây
            'speaking': { render: () => '<div class="module-card"><h1>Speaking Module</h1><p>Tính năng đang phát triển...</p></div>', init: () => {} },
            'reading': { render: () => '<div class="module-card"><h1>Reading Module</h1><p>Tính năng đang phát triển...</p></div>', init: () => {} },
            'writing': { render: () => '<div class="module-card"><h1>Writing Module</h1><p>Tính năng đang phát triển...</p></div>', init: () => {} }
        };

        this.init();
    }

    init() {
        // Xử lý sự kiện Menu
        this.navItems.forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                this.navigate(item.dataset.skill);
            };
        });

        // Logo click
        document.querySelector('.logo').onclick = () => this.navigate('dashboard');

        // Mặc định về Dashboard
        this.navigate('dashboard');
    }

    navigate(skill) {
        const module = this.modules[skill] || this.modules['dashboard'];
        
        // Hiệu ứng chuyển cảnh
        this.appContent.style.opacity = '0';
        this.appContent.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Render giao diện
            this.appContent.innerHTML = module.render();

            // Cập nhật trạng thái menu
            this.navItems.forEach(nav => {
                nav.classList.toggle('active', nav.dataset.skill === skill);
            });

            // Khởi tạo logic của module
            if (skill === 'dashboard') {
                module.init((targetSkill) => this.navigate(targetSkill));
            } else {
                module.init();
            }

            // Hiển thị lại
            this.appContent.style.opacity = '1';
            this.appContent.style.transform = 'translateY(0)';
        }, 150);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

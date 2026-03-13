export const DashboardModule = {
    render: () => `
        <div class="dashboard-enhanced">
            <div class="section-header" style="margin-bottom: 40px;">
                <h1 class="section-title">Welcome back, Scout! 👋</h1>
                <p class="section-subtitle">Hôm nay là một ngày tuyệt vời để nâng cấp kỹ năng của bạn.</p>
            </div>

            <!-- Stats & Goals Section -->
            <div class="stats-container">
                <div class="chart-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3>Weekly Activity</h3>
                        <span style="font-size: 0.8rem; color: var(--primary);">+12% vs last week</span>
                    </div>
                    <div class="chart-placeholder">
                        <div class="chart-bar" style="height: 40%;" data-day="Mon"></div>
                        <div class="chart-bar" style="height: 70%;" data-day="Tue"></div>
                        <div class="chart-bar" style="height: 55%;" data-day="Wed"></div>
                        <div class="chart-bar" style="height: 90%;" data-day="Thu"></div>
                        <div class="chart-bar" style="height: 65%;" data-day="Fri"></div>
                        <div class="chart-bar" style="height: 30%;" data-day="Sat"></div>
                        <div class="chart-bar" style="height: 0%;" data-day="Sun"></div>
                    </div>
                </div>

                <div class="goals-card">
                    <h3>Daily Goals</h3>
                    <div style="margin-top: 20px;">
                        <div class="goal-item done">
                            <div class="goal-status"><i class="fas fa-check"></i></div>
                            <span>Luyện nghe 15 phút</span>
                        </div>
                        <div class="goal-item done">
                            <div class="goal-status"><i class="fas fa-check"></i></div>
                            <span>Học 10 từ vựng mới</span>
                        </div>
                        <div class="goal-item">
                            <div class="goal-status"></div>
                            <span>Viết 1 đoạn văn ngắn</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Skill Progress Grid -->
            <h3 style="margin-bottom: 20px;">Your Progress by Skills</h3>
            <div class="module-card" style="margin-bottom: 40px;">
                <div class="skill-progress-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
                    <div class="skill-progress-item">
                        <div class="progress-info">
                            <span>Listening</span>
                            <span>75%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: 75%;"></div>
                        </div>
                    </div>
                    <div class="skill-progress-item">
                        <div class="progress-info">
                            <span>Speaking</span>
                            <span>42%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: 42%; background: var(--secondary);"></div>
                        </div>
                    </div>
                    <div class="skill-progress-item">
                        <div class="progress-info">
                            <span>Reading</span>
                            <span>90%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: 90%; background: #10b981;"></div>
                        </div>
                    </div>
                    <div class="skill-progress-item">
                        <div class="progress-info">
                            <span>Writing</span>
                            <span>28%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: 28%; background: var(--accent);"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Action -->
            <div style="text-align: center;">
                <button class="btn btn-primary" id="quick-start-btn" style="padding: 18px 40px; font-size: 1.1rem; border-radius: 50px;">
                    <i class="fas fa-play"></i> Bắt đầu luyện tập ngay
                </button>
            </div>
        </div>
    `,
    init: (navigateCallback) => {
        const startBtn = document.getElementById('quick-start-btn');
        if (startBtn) {
            startBtn.onclick = () => navigateCallback('listening');
        }

        // Tạo hiệu ứng số chạy hoặc hoạt ảnh nhẹ nhàng ở đây nếu cần
        console.log("Dashboard Initialized");
    }
};

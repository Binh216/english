import { authService } from '../../services/authService.js';

export const ProfileModule = {
  render: () => {
    const user = authService.getUser();

    return `
      <div class="profile-card">
        <h1>Thông tin cá nhân</h1>
        <div class="profile-details">
          <div class="profile-row">
            <span class="label">Họ và tên</span>
            <span class="value">${user?.name || '--'}</span>
          </div>
          <div class="profile-row">
            <span class="label">Email</span>
            <span class="value">${user?.email || '--'}</span>
          </div>
        </div>
        <div class="profile-actions">
          <button id="logout-btn" class="btn btn-secondary">Đăng xuất</button>
        </div>
      </div>
    `;
  },

  init: ({ navigate }) => {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => {
      authService.logout();
      navigate('login');
    });
  },
};

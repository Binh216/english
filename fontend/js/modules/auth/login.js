import { authService } from '../../services/authService.js';

export const LoginModule = {
  render: () => `
    <div class="auth-card">
      <h1>Đăng nhập</h1>
      <form id="login-form" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary">Đăng nhập</button>
        <div class="form-footer">
          <span>Bạn chưa có tài khoản?</span>
          <a href="#register" class="link">Đăng ký ngay</a>
        </div>
      </form>
      <div id="login-error" class="form-error hidden"></div>
    </div>
  `,

  init: ({ navigate }) => {
    const form = document.getElementById('login-form');
    const errorBox = document.getElementById('login-error');

    const showError = (message) => {
      if (!errorBox) return;
      errorBox.textContent = message;
      errorBox.classList.remove('hidden');
    };

    form?.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      if (!form) return;

      const formData = new FormData(form);
      const email = formData.get('email')?.toString().trim();
      const password = formData.get('password')?.toString().trim();

      try {
        await authService.login({ email, password });
        navigate('dashboard');
      } catch (error) {
        showError(error?.payload?.message || error?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    });
  },
};

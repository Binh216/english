import { authService } from '../../services/authService.js';

export const RegisterModule = {
  render: () => `
    <div class="auth-card">
      <h1>Đăng ký</h1>
      <form id="register-form" class="auth-form">
        <div class="form-group">
          <label for="name">Họ và tên</label>
          <input id="name" name="name" type="text" placeholder="Nguyễn Văn A" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary">Đăng ký</button>
        <div class="form-footer">
          <span>Đã có tài khoản?</span>
          <a href="#login" class="link">Đăng nhập</a>
        </div>
      </form>
      <div id="register-error" class="form-error hidden"></div>
    </div>
  `,

  init: ({ navigate }) => {
    const form = document.getElementById('register-form');
    const errorBox = document.getElementById('register-error');

    const showError = (message) => {
      if (!errorBox) return;
      errorBox.textContent = message;
      errorBox.classList.remove('hidden');
    };

    form?.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      if (!form) return;

      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const password = formData.get('password')?.toString().trim();

      try {
        await authService.register({ name, email, password });
        navigate('dashboard');
      } catch (error) {
        showError(error?.payload?.message || error?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    });
  },
};

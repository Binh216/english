export const ListeningModule = {
  render: () => `
    <div class="module-card">
      <div class="section-header">
        <span class="topic-tag">Advanced Listening</span>
        <h1 class="section-title">Kỹ năng Nghe</h1>
        <p class="section-subtitle">Luyện tập nghe hiểu qua các đoạn hội thoại thực tế.</p>
      </div>

      <div class="audio-widget">
        <audio controls style="width: 100%; border-radius: 8px;">
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
        </audio>
      </div>

      <div class="transcript-section">
        <button class="btn btn-outline" id="toggle-transcript">
          <i class="fas fa-closed-captioning"></i> Xem Transcript
        </button>
        <div id="transcript-content" class="transcript-panel hidden">
          <strong>Speaker A:</strong> Hi there! It's been a while since we last spoke.<br>
          <strong>Speaker B:</strong> Indeed! How have you been?
        </div>
      </div>

      <hr style="border: 0; border-top: 1px solid var(--glass-border); margin: 30px 0;">

      <div class="questions">
        <div class="question-card">
          <p>1. What is the tone of the conversation?</p>
          <button class="option-btn" data-value="a">Formal and professional</button>
          <button class="option-btn" data-value="b">Casual and friendly</button>
          <button class="option-btn" data-value="c">Angry and defensive</button>
        </div>
      </div>

      <button class="btn btn-primary" id="submit-listening">
        <i class="fas fa-paper-plane"></i> Nộp bài bài làm
      </button>

      <div id="feedback" class="hidden" style="margin-top: 20px; padding: 20px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981;">
        Kết quả đã được ghi nhận!
      </div>
    </div>
  `,
  init: () => {
    const toggleBtn = document.getElementById('toggle-transcript');
    const content = document.getElementById('transcript-content');
    if (toggleBtn && content) {
      toggleBtn.addEventListener('click', () => content.classList.toggle('hidden'));
    }

    const options = document.querySelectorAll('.option-btn');
    options.forEach((opt) => {
      opt.addEventListener('click', () => {
        const parent = opt.parentElement;
        parent.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    const submitButton = document.getElementById('submit-listening');
    const feedback = document.getElementById('feedback');
    if (submitButton && feedback) {
      submitButton.addEventListener('click', () => {
        feedback.classList.remove('hidden');
      });
    }
  },
};

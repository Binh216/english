export const templates = {
    dashboard: `
        <div class="dashboard-home">
            <h1 class="section-title">Chào mừng đến với EngFlow</h1>
            <p class="text-muted">Chọn một kỹ năng để bắt đầu hành trình chinh phục tiếng Anh của bạn.</p>
            
            <div class="skills-grid">
                <div class="skill-card" data-skill="listening">
                    <i class="fas fa-headphones"></i>
                    <h3>Listening</h3>
                    <p>Luyện nghe hiểu qua các đoạn hội thoại thực tế.</p>
                </div>
                <div class="skill-card" data-skill="speaking">
                    <i class="fas fa-microphone"></i>
                    <h3>Speaking</h3>
                    <p>Cải thiện phát âm và khả năng giao tiếp.</p>
                </div>
                <div class="skill-card" data-skill="reading">
                    <i class="fas fa-book-open"></i>
                    <h3>Reading</h3>
                    <p>Nâng cao vốn từ vựng và kỹ năng đọc hiểu.</p>
                </div>
                <div class="skill-card" data-skill="writing">
                    <i class="fas fa-pen-nib"></i>
                    <h3>Writing</h3>
                    <p>Luyện viết đoạn văn và bài luận logic.</p>
                </div>
            </div>
        </div>
    `,
    listening: `
        <div class="card">
            <h2 class="section-title"><i class="fas fa-headphones"></i> Kỹ năng Nghe</h2>
            <div class="practice-container">
                <div class="audio-player-wrapper">
                    <div class="audio-info">
                        <span class="topic-tag">Topic: Daily Communications</span>
                        <h3>Luyện tập: "Meeting a New Friend"</h3>
                    </div>
                    <audio controls id="main-audio" class="custom-audio">
                        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                        Trình duyệt của bạn không hỗ trợ audio.
                    </audio>
                </div>

                <div class="transcript-container">
                    <button class="btn btn-outline" id="toggle-transcript">
                        <i class="fas fa-closed-captioning"></i> Xem Transcript
                    </button>
                    <div class="transcript-content hidden" id="transcript-text">
                        <p><strong>Speaker A:</strong> Hi there! My name is Alex. Nice to meet you.</p>
                        <p><strong>Speaker B:</strong> Hello Alex! I'm Sarah. Are you new here?</p>
                        <p><strong>Speaker A:</strong> Yes, I just moved to the neighborhood last week.</p>
                    </div>
                </div>

                <hr class="separator">

                <div class="mcq-section">
                    <h3>Câu hỏi trắc nghiệm:</h3>
                    
                    <div class="question-item">
                        <p>1. Who is Alex?</p>
                        <div class="options">
                            <label class="option-container">
                                <input type="radio" name="q1" value="a">
                                <span class="checkmark"></span> A high school teacher
                            </label>
                            <label class="option-container">
                                <input type="radio" name="q1" value="b">
                                <span class="checkmark"></span> A new neighbor
                            </label>
                            <label class="option-container">
                                <input type="radio" name="q1" value="c">
                                <span class="checkmark"></span> Sarah's old friend
                            </label>
                        </div>
                    </div>

                    <div class="question-item">
                        <p>2. When did Alex move here?</p>
                        <div class="options">
                            <label class="option-container">
                                <input type="radio" name="q2" value="a">
                                <span class="checkmark"></span> Yesterday
                            </label>
                            <label class="option-container">
                                <input type="radio" name="q2" value="b">
                                <span class="checkmark"></span> Last month
                            </label>
                            <label class="option-container">
                                <input type="radio" name="q2" value="c">
                                <span class="checkmark"></span> Last week
                            </label>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary" id="submit-btn"><i class="fas fa-check"></i> Submit Answers</button>
                
                <div class="feedback-area" id="feedback-area">
                    <div class="feedback-header">
                        <i class="fas fa-chart-line"></i> <h4>Kết quả luyện tập:</h4>
                    </div>
                    <p id="feedback-text"></p>
                </div>
            </div>
        </div>
    `,
    speaking: `
        <div class="card">
            <h2 class="section-title"><i class="fas fa-microphone"></i> Kỹ năng Nói</h2>
            <div class="practice-container">
                <div class="training-box">
                    <p>Hãy đọc to câu sau:</p>
                    <div class="quote-box" style="font-style: italic; font-size: 1.2rem; margin: 1.5rem 0; padding: 1rem; border-left: 3px solid var(--primary); background: rgba(255,255,255,0.05);">
                        "Persistence is the key to mastering any language."
                    </div>
                    <div style="text-align: center;">
                        <button class="btn" style="background: var(--accent); color: white; border-radius: 50%; width: 60px; height: 60px; justify-content: center;" id="record-btn">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <p style="margin-top: 10px; font-size: 0.9rem;" id="record-status">Nhấn để bắt đầu ghi âm</p>
                    </div>
                </div>
                <div class="feedback-area" id="feedback-area">
                    <h4>Phản hồi AI:</h4>
                    <p id="feedback-text"></p>
                </div>
            </div>
        </div>
    `,
    reading: `
        <div class="card">
            <h2 class="section-title"><i class="fas fa-book-open"></i> Kỹ năng Đọc</h2>
            <div class="practice-container">
                <div class="training-box">
                    <div class="reading-text" style="height: 250px; overflow-y: auto; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 12px; margin-bottom: 1.5rem;">
                        <p><strong>The Future of AI:</strong> Artificial Intelligence is transforming the world at an unprecedented pace. From healthcare to finance, AI systems are making decisions that were once the sole province of human experts...</p>
                        <p style="margin-top: 10px;">However, with great power comes great responsibility. The ethical implications of AI deployment are a major topic of discussion among world leaders and tech pioneers.</p>
                    </div>
                    <div class="input-group">
                        <label>Câu hỏi: Chủ đề chính của đoạn văn là gì?</label>
                        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                            <label><input type="radio" name="q1" value="a"> A. Lịch sử của máy tính</label>
                            <label><input type="radio" name="q1" value="b"> B. Tác động và đạo đức của AI</label>
                            <label><input type="radio" name="q1" value="c"> C. Cách học tiếng Anh tốt nhất</label>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" id="submit-btn"><i class="fas fa-check"></i> Kiểm tra đáp án</button>
                <div class="feedback-area" id="feedback-area">
                    <h4>Kết quả:</h4>
                    <p id="feedback-text"></p>
                </div>
            </div>
        </div>
    `,
    writing: `
        <div class="card">
            <h2 class="section-title"><i class="fas fa-pen-nib"></i> Kỹ năng Viết</h2>
            <div class="practice-container">
                <div class="training-box">
                    <label>Đề bài: Hãy viết một đoạn văn ngắn (50-100 từ) về sở thích của bạn.</label>
                    <textarea id="practice-input" rows="8" placeholder="Bắt đầu viết tại đây..."></textarea>
                </div>
                <button class="btn btn-primary" id="submit-btn"><i class="fas fa-paper-plane"></i> Gửi bài làm</button>
                <div class="feedback-area" id="feedback-area">
                    <h4>Nhận xét chi tiết:</h4>
                    <p id="feedback-text"></p>
                </div>
            </div>
        </div>
    `
};

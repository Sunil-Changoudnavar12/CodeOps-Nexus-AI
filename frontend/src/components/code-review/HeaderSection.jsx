import "../styles/Header.css";
function HeaderSection() {
    return (
        <div className="code-review-header">
            <div className="topcompo">
            <div className="code-review-icon">
                {'</>'}
            </div>

            <div className="code-review-heading">

                <div className="title-row">
                    <h1>AI Code Review</h1>
                    <span className="ai-badge">✨ AI Powered</span>
                </div>

                <p>
                    Analyze code, detect bugs, identify security risks,
                    and generate AI-powered fixes.
                </p>

            </div></div>

            <div className="user-input">

                <div className="input-method">

                    <label className="input-option">
                        <input
                            type="radio"
                            name="inputMethod"
                            value="upload"
                        />
                        <span>Upload File</span>
                    </label>

                    <label className="input-option">
                        <input
                            type="radio"
                            name="inputMethod"
                            value="paste"
                        />
                        <span>Paste Code</span>
                    </label>

                    <label className="input-option">
                        <input
                            type="radio"
                            name="inputMethod"
                            value="repo"
                        />
                        <span>Connect Repo</span>
                    </label>

                </div>
                <div className="len-list">
                    <label htmlFor="language">Language</label>
                    <select id="language" name="language" className="language-dropdown">
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

            </div>

        </div>
    );
}

export default HeaderSection;
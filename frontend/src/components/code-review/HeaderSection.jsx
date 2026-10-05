import "../styles/Header.css";
import { useRef } from "react";
function HeaderSection({ language, onLanguageChange, onUpload, onPaste, inputMethod, onInputMethodChange }) {
    const fileInput = useRef(null);
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            onPaste(text);
        } catch {
            onPaste("");
        }
    };
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

                    <input ref={fileInput} className="header-file-input" type="file" accept=".py,.js,.jsx,.ts,.tsx,.java,.cs,.cpp,.c,.txt" onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (file) onUpload(await file.text(), file.name);
                        event.target.value = "";
                    }} aria-label="Choose code file" />
                    <button className={`input-option ${inputMethod === "upload" ? "is-active" : ""}`} type="button" onClick={() => { onInputMethodChange("upload"); fileInput.current?.click(); }}>Upload Code</button>
                    <button className={`input-option ${inputMethod === "paste" ? "is-active" : ""}`} type="button" onClick={() => { onInputMethodChange("paste"); handlePaste(); }}>Paste Code</button>
                    <button className={`input-option ${inputMethod === "repo" ? "is-active" : ""}`} type="button" onClick={() => onInputMethodChange("repo")}>Connect Repo</button>

                </div>
                <div className="len-list">
                    <label htmlFor="language" >Language</label>
                    <select id="language" name="language" className="language-dropdown" value={language} onChange={(event) => onLanguageChange(event.target.value)}>
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

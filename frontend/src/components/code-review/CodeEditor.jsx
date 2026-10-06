import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/CodeEditor.css";

const API_ORIGIN = new URL(
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
).origin;

function CodeEditor({ language = "python", code, onCodeChange, fileName = "app.py", onAnalyze, onEditorMount }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const editorRef = useRef(null);
    const containerRef = useRef(null);

    const analyzeCode = async () => {
        if (isAnalyzing) return;

        setIsAnalyzing(true);
        setError("");
        setResponse(null);
        onAnalyze?.(null);

        try {
            const result = await fetch(`${API_ORIGIN}/api/code-review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language }),
            });

            const data = await result.json().catch(() => null);
            if (!result.ok) {
                const detail = typeof data?.detail === "string" ? data.detail : `Request failed (${result.status}).`;
                throw new Error(detail);
            }
            if (typeof data?.summary !== "string" || !Array.isArray(data.issues)) {
                throw new Error("The backend returned an invalid code review response.");
            }

            setResponse(data);
            onAnalyze?.(data);
        } catch (requestError) {
            setError(requestError instanceof TypeError
                ? "Could not reach the backend. Check that FastAPI is running at http://127.0.0.1:8000."
                : requestError.message || "The request failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const formatCode = () => {
        editorRef.current?.getAction("editor.action.formatDocument")?.run();
    };

    const toggleFullscreen = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else containerRef.current?.requestFullscreen?.();
    };

    return (
        <section className="code-editor-container" aria-label="Code editor" ref={containerRef}>
            <div className="code-editor-header">
                <div className="file-info">
                    <span className="python-icon" aria-hidden="true">{language}</span>
                    <span className="file-name">{fileName}</span>
                </div>
                <div className="editor-actions">
                    <button className="editor-icon-btn" type="button" title="Format code" aria-label="Format code" onClick={formatCode}>⌘</button>
                    <button className="editor-icon-btn" type="button" title="Toggle fullscreen" aria-label="Toggle fullscreen" onClick={toggleFullscreen}>⛶</button>
                </div>
            </div>
            <div className="editor-wrapper">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={(value) => { onCodeChange(value ?? ""); setResponse(null); setError(""); }}
                    onMount={(editor) => { editorRef.current = editor; onEditorMount?.(editor); }}
                    theme="vs-dark"
                    options={{
                        automaticLayout: true,
                        minimap: { enabled: false },
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "off",
                        tabSize: 4,
                        insertSpaces: true,
                        fontSize: 14,
                        fontFamily: "Consolas, 'Courier New', monospace",
                        padding: { top: 14, bottom: 14 },
                        renderWhitespace: "selection",
                        bracketPairColorization: { enabled: true },
                    }}
                />
            </div>
            <div className="code-editor-footer">
                <div className="editor-status">
                    <span>{language}</span><span aria-hidden="true">•</span>
                    <span>{code ? code.split("\n").length : 0} lines</span><span aria-hidden="true">•</span><span>UTF-8</span>
                </div>
                <button className="analyze-code-btn" type="button" onClick={analyzeCode} disabled={isAnalyzing}>
                    {isAnalyzing ? "Analyzing..." : "Analyze Code"}
                    {!isAnalyzing && <span aria-hidden="true">→</span>}
                </button>
            </div>
            {error && <div className="editor-response editor-response-error" role="alert">{error}</div>}
            {response && (
                <div className="editor-response editor-response-success" role="status">
                    <strong>Code review complete</strong>
                    <span>Score {response.score}/100 · {response.issues.length} issue{response.issues.length === 1 ? "" : "s"}</span>
                </div>
            )}
        </section>
    );
}

export default CodeEditor;

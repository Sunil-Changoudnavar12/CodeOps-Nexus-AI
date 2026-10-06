import { useState } from "react";
import "../pages/styles/CodeReview.css";
import HeaderSection from "../components/code-review/HeaderSection";
import CodeEditor from "../components/code-review/CodeEditor";

function CodeReview() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("app.py");
  const [inputMethod, setInputMethod] = useState("paste");
  const [analysis, setAnalysis] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);

  const jumpToLine = (lineNumber) => {
    if (!editorInstance) return;
    editorInstance.setPosition({ lineNumber, column: 1 });
    editorInstance.revealLineInCenter(lineNumber);
    editorInstance.focus();
  };

  return (
    <>
      <HeaderSection
        language={language}
        onLanguageChange={setLanguage}
        inputMethod={inputMethod}
        onInputMethodChange={setInputMethod}
        onUpload={(contents, name) => { setCode(contents); setFileName(name); setAnalysis(null); }}
        onPaste={(contents) => {
          if (contents) { setCode(contents); setAnalysis(null); }
          requestAnimationFrame(() => {
            const model = editorInstance?.getModel();
            if (!model || !editorInstance) return;
            editorInstance.setPosition(model.getPositionAt(model.getValueLength()));
            editorInstance.focus();
          });
        }}
      />
      <main className="code-review-page">
        <div className="code-review-workspace">
          <CodeEditor
            language={language}
            code={code}
            onCodeChange={(nextCode) => { setCode(nextCode); setAnalysis(null); }}
            fileName={fileName}
            inputMethod={inputMethod}
            onAnalyze={setAnalysis}
            onEditorMount={setEditorInstance}
          />
          <aside className="review-panel" aria-live="polite">
            <div className="review-panel-header">
              <div>
                <p className="review-panel-eyebrow">CODE REVIEW</p>
                <h2>{analysis ? "Review results" : "Review findings"}</h2>
              </div>
              {analysis && <div className="review-score"><strong>{analysis.score}</strong><span>/100</span></div>}
            </div>
            {!analysis ? (
              <div className="review-empty"><span aria-hidden="true">⌕</span><p>Run Analyze Code to check for common security risks and unfinished work.</p></div>
            ) : (
              <>
                <p className="review-file-name">{analysis.summary}</p>
                {analysis.issues.length === 0 ? (
                  <div className="review-clean"><strong>No issues found</strong><p>The code review did not identify any issues.</p></div>
                ) : (
                  <div className="finding-list">
                    {analysis.issues.map((issue, index) => (
                      <article className={`finding-card severity-${issue.severity}`} key={`${issue.line}-${issue.category}-${index}`}>
                        <div className="finding-title-row"><span className="finding-severity">{issue.severity}</span><button type="button" onClick={() => jumpToLine(issue.line)}>Line {issue.line}</button></div>
                        <h3>{issue.message}</h3>
                        <p>{issue.suggestion}</p>
                        <span className="finding-category">{issue.category.replaceAll("_", " ")}</span>
                      </article>
                    ))}
                  </div>
                )}
                <p className="review-disclaimer">Mock review results. Review the code and run project tests before merging.</p>
              </>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

export default CodeReview;

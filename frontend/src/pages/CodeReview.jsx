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
              {analysis && <div className="review-score"><strong>{analysis.quality_score}</strong><span>/100</span></div>}
            </div>
            {!analysis ? (
              <div className="review-empty"><span aria-hidden="true">⌕</span><p>Run Analyze Code to check for common security risks and unfinished work.</p></div>
            ) : (
              <>
                <p className="review-file-name">{analysis.filename} · {analysis.language}</p>
                {analysis.findings.length === 0 ? (
                  <div className="review-clean"><strong>No common issues found</strong><p>The backend checks found no matching issues in this file.</p></div>
                ) : (
                  <div className="finding-list">
                    {analysis.findings.map((finding, index) => (
                      <article className={`finding-card severity-${finding.severity}`} key={`${finding.line_number}-${finding.title}-${index}`}>
                        <div className="finding-title-row"><span className="finding-severity">{finding.severity}</span><button type="button" onClick={() => jumpToLine(finding.line_number)}>Line {finding.line_number}</button></div>
                        <h3>{finding.title}</h3>
                        <p>{finding.description}</p>
                        <span className="finding-category">{finding.category.replaceAll("_", " ")}</span>
                      </article>
                    ))}
                  </div>
                )}
                <p className="review-disclaimer">Pattern based checks only. This is not an AI or full security audit.</p>
              </>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

export default CodeReview;

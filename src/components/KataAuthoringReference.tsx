import { KATA_FIELD_REFERENCE, LLM_KATA_COPY_BLOCK } from '../lib/llmKataTemplate';

export default function KataAuthoringReference() {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(LLM_KATA_COPY_BLOCK);
  };

  return (
    <div className="docs-page">
      <header className="docs-header">
        <h1>Kata Authoring</h1>
        <p className="docs-lead">
          Copy the block below into your LLM, generate JSON, then import it from the{' '}
          <a href="/#katas">Practice hub</a>.
        </p>
      </header>

      <section className="docs-section">
        <h2>LLM prompt and JSON format</h2>
        <p>
          Paste this entire block as the system prompt (or first message). The model should reply
          with a single JSON object matching the example structure at the bottom.
        </p>
        <pre className="docs-code-block docs-code-scroll">{LLM_KATA_COPY_BLOCK}</pre>
        <div className="docs-actions">
          <button type="button" className="btn btn-primary" onClick={handleCopy}>
            Copy prompt and format
          </button>
        </div>
      </section>

      <section className="docs-section">
        <h2>Field reference</h2>
        <div className="docs-table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {KATA_FIELD_REFERENCE.map((row) => (
                <tr key={row.field}>
                  <td>
                    <code>{row.field}</code>
                  </td>
                  <td>{row.type}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section">
        <h2>Next step</h2>
        <p>
          When your LLM returns valid JSON, go to the hub and use <strong>Import kata</strong> in
          the Practice section.
        </p>
        <a className="btn btn-secondary" href="/#katas">
          Go to Practice hub
        </a>
      </section>
    </div>
  );
}

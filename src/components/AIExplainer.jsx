import { useState } from 'react';
import { useApp } from '../context/AppContext';

const SYSTEM_PROMPT = `You are a patient, direct coding mentor. The student is an intermediate developer with React/Supabase experience who needs to fill CS fundamentals gaps. Explain concepts using real project analogies (like building a content distribution system or a portfolio site). Never be condescending. If they're stuck, give progressive hints — not the answer. Use short paragraphs. When relevant, show code snippets.`;

export default function AIExplainer({ lesson }) {
  const { rateHelpful, helpfulRatings } = useApp();
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('codepath_api_key') || '');

  const rating = helpfulRatings[lesson.id];

  const fetchExplanation = async (customPrompt) => {
    const key = apiKey || localStorage.getItem('codepath_api_key');
    if (!key) {
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    const userMessage = customPrompt ||
      `I'm learning about "${lesson.title}". Can you explain this concept in a way that connects to real-world React/Supabase development? Here's what the lesson covers:\n\n${lesson.concept}\n\nHelp me understand this more deeply.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.content[0]?.text || 'No response received.');
    } catch (err) {
      setError(err.message);
      if (err.message.includes('401') || err.message.includes('invalid')) {
        setShowApiKeyInput(true);
      }
    }

    setIsLoading(false);
  };

  const saveApiKey = () => {
    localStorage.setItem('codepath_api_key', apiKey);
    setShowApiKeyInput(false);
    fetchExplanation();
  };

  return (
    <div className="ai-section">
      {!response && !isLoading && (
        <button className="go-deeper-btn" onClick={() => fetchExplanation()}>
          🤖 Go Deeper — Get an AI-Powered Explanation
        </button>
      )}

      {showApiKeyInput && (
        <div className="ai-response" style={{ marginTop: 12 }}>
          <div className="ai-response-header">🔑 API Key Required</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Enter your Anthropic API key to enable AI explanations. It's stored locally in your browser.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
              }}
            />
            <button className="run-btn" onClick={saveApiKey}>Save & Go</button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="ai-response" style={{ marginTop: 12 }}>
          <div className="ai-response-header loading-pulse">🤖 Claude is thinking...</div>
          <div className="ai-response-content" style={{ color: 'var(--text-muted)' }}>
            Generating a personalized explanation...
          </div>
        </div>
      )}

      {error && !showApiKeyInput && (
        <div className="ai-response" style={{ marginTop: 12, borderColor: 'var(--error)' }}>
          <div className="ai-response-header" style={{ color: 'var(--error)' }}>Error</div>
          <div className="ai-response-content" style={{ color: 'var(--error)' }}>{error}</div>
          <button
            className="go-deeper-btn"
            style={{ marginTop: 12, borderColor: 'var(--error)', color: 'var(--error)' }}
            onClick={() => fetchExplanation()}
          >
            Try Again
          </button>
        </div>
      )}

      {response && (
        <div className="ai-response slide-up" style={{ marginTop: 12 }}>
          <div className="ai-response-header">🤖 Claude's Explanation</div>
          <div className="ai-response-content">{response}</div>
          <div className="ai-feedback">
            <span>Did this help?</span>
            <button
              className={rating === true ? 'selected' : ''}
              onClick={() => rateHelpful(lesson.id, true)}
            >👍</button>
            <button
              className={rating === false ? 'selected' : ''}
              onClick={() => rateHelpful(lesson.id, false)}
            >👎</button>
          </div>
          <button
            className="go-deeper-btn"
            style={{ marginTop: 12 }}
            onClick={() => fetchExplanation("I still don't fully understand. Can you explain it differently, maybe with a simpler analogy or a step-by-step walkthrough?")}
          >
            I still don't understand — explain differently
          </button>
        </div>
      )}
    </div>
  );
}

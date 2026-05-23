import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';

const SYSTEM_PROMPT = `You are a patient, direct coding mentor. The student is an intermediate developer with React/Supabase experience who needs to fill CS fundamentals gaps. Explain concepts using real project analogies (like building a content distribution system or a portfolio site). Never be condescending. If they're stuck, give progressive hints — not the answer. Use short paragraphs. When relevant, show code snippets.`;

const STORAGE_KEY = 'codepath_anthropic_key';

export default function AIExplainer({ lesson }) {
  const { rateHelpful, helpfulRatings } = useApp();
  const { lang, t } = useLang();
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');

  const rating = helpfulRatings[lesson.id];

  const fetchExplanation = async (customPrompt) => {
    const key = apiKey || localStorage.getItem(STORAGE_KEY);
    if (!key) {
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    const langInstruction = lang === 'pt' ? '\n\nIMPORTANT: Respond in Brazilian Portuguese.' : '';

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
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM_PROMPT + langInstruction,
          messages: [{ role: 'user', content: userMessage }],
          stream: true,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6);
          if (jsonStr === '[DONE]') continue;
          try {
            const data = JSON.parse(jsonStr);
            if (data.type === 'content_block_delta' && data.delta?.type === 'text_delta') {
              text += data.delta.text;
              setResponse(text);
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }

      if (!text) setResponse('No response received.');
    } catch (err) {
      setError(err.message);
      const isAuthError = err.message.includes('401') || err.message.includes('authentication') ||
        err.message.includes('invalid') || err.message.includes('key');
      if (isAuthError) setShowApiKeyInput(true);
    }

    setIsLoading(false);
  };

  const saveApiKey = () => {
    localStorage.setItem(STORAGE_KEY, apiKey);
    setShowApiKeyInput(false);
    fetchExplanation();
  };

  return (
    <div className="ai-section">
      {!response && !isLoading && (
        <button className="go-deeper-btn" onClick={() => fetchExplanation()}>
          {t('goDeeper')}
        </button>
      )}

      {showApiKeyInput && (
        <div className="ai-response" style={{ marginTop: 12 }}>
          <div className="ai-response-header">{t('apiKeyRequired')}</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            {t('apiKeyDescription')}{' '}
            <a
              href="https://console.anthropic.com/account/keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-purple)' }}
            >
              console.anthropic.com
            </a>
            {t('apiKeyStored')}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveApiKey()}
              placeholder={t('apiKeyPlaceholder')}
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
            <button className="run-btn" onClick={saveApiKey}>{t('saveAndGo')}</button>
          </div>
        </div>
      )}

      {isLoading && !response && (
        <div className="ai-response" style={{ marginTop: 12 }}>
          <div className="ai-response-header loading-pulse">{t('aiThinking')}</div>
          <div className="ai-response-content" style={{ color: 'var(--text-muted)' }}>
            {t('generating')}
          </div>
        </div>
      )}

      {error && !showApiKeyInput && (
        <div className="ai-response" style={{ marginTop: 12, borderColor: 'var(--error)' }}>
          <div className="ai-response-header" style={{ color: 'var(--error)' }}>{t('error')}</div>
          <div className="ai-response-content" style={{ color: 'var(--error)' }}>{error}</div>
          <button
            className="go-deeper-btn"
            style={{ marginTop: 12, borderColor: 'var(--error)', color: 'var(--error)' }}
            onClick={() => fetchExplanation()}
          >
            {t('tryAgain')}
          </button>
        </div>
      )}

      {response && (
        <div className="ai-response slide-up" style={{ marginTop: 12 }}>
          <div className="ai-response-header">{t('aiExplanation')}</div>
          <div className="ai-response-content">
            {response}
            {isLoading && <span className="stream-cursor">▊</span>}
          </div>
          {!isLoading && (
            <>
              <div className="ai-feedback">
                <span>{t('didThisHelp')}</span>
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
                {t('explainDifferently')}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

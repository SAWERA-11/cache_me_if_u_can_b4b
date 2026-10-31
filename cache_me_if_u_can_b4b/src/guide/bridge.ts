import { playClip } from '../lib/audio';
import { uiBus } from '../lib/uiBus';
import { useApp } from '../store/useApp';

const KINDS = ['name', 'dob', 'id_number', 'phone', 'email', 'address', 'choice', 'file', 'checkbox', 'generic'];
const identifier = (value: unknown): value is string => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value);

/** Accept only the protocol's allowlisted identifiers, never arbitrary page content. */
export function handleGuideMessage(raw: string): void {
  if (raw.length > 4096) return;
  try {
    const message: unknown = JSON.parse(raw);
    if (!message || typeof message !== 'object' || Array.isArray(message)) return;
    const msg = message as Record<string, unknown>;
    switch (msg.type) {
      case 'PLAY_AUDIO':
        if (identifier(msg.audioId)) playClip(msg.audioId, useApp.getState().audioSpeed);
        break;
      case 'JARGON':
        if (identifier(msg.termId)) uiBus.emit('jargon', msg.termId);
        break;
      case 'ASK_HELPER':
        if (Array.isArray(msg.kinds) && msg.kinds.length <= KINDS.length && msg.kinds.every(kind => typeof kind === 'string' && KINDS.includes(kind))) {
          uiBus.emit('helper', [...new Set(msg.kinds as string[])]);
        }
        break;
      case 'FIELD_HELP':
        if (typeof msg.fieldKind === 'string' && KINDS.includes(msg.fieldKind)) useApp.getState().addStruggle(msg.fieldKind);
        break;
    }
  } catch { /* Untrusted page messages are ignored. */ }
}

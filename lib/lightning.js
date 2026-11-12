// Lightning address helpers. The app only ever asks a recipient's wallet
// provider for information or an invoice. It never receives or holds funds.

// Looks up a Lightning address (already validated as name@domain) at its
// provider and confirms that it can receive payments.
// Returns { ok: true, minSendable, maxSendable, callback } or { ok: false }.
export async function lookupLightningAddress(address) {
  const at = address.lastIndexOf('@');
  const name = address.slice(0, at);
  const domain = address.slice(at + 1);
  const url = `https://${domain}/.well-known/lnurlp/${encodeURIComponent(name)}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return { ok: false };

    const data = await res.json();
    if (!data || data.tag !== 'payRequest' || typeof data.callback !== 'string') {
      return { ok: false };
    }

    return {
      ok: true,
      callback: data.callback,
      minSendable: Number(data.minSendable) || 0,
      maxSendable: Number(data.maxSendable) || 0,
    };
  } catch {
    return { ok: false };
  }
}

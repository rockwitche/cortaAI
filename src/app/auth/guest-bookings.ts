export const GUEST_BOOKINGS_STORAGE_KEY = 'cortaai:guest-receipts';

interface GuestReceipt {
  agendamentoId: string;
  guestAccessToken: string;
  savedAt: number;
}

function readGuestReceipts(): GuestReceipt[] {
  if (typeof localStorage === 'undefined') return [];

  try {
    const raw = localStorage.getItem(GUEST_BOOKINGS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as GuestReceipt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGuestReceipt(agendamentoId: string, guestAccessToken: string): void {
  if (!agendamentoId || !guestAccessToken || typeof localStorage === 'undefined') return;

  const receipts = readGuestReceipts().filter((receipt) => receipt.agendamentoId !== agendamentoId);
  receipts.push({
    agendamentoId,
    guestAccessToken,
    savedAt: Date.now(),
  });

  localStorage.setItem(GUEST_BOOKINGS_STORAGE_KEY, JSON.stringify(receipts));
}

export function getGuestReceipt(agendamentoId: string): string | null {
  const receipt = readGuestReceipts().find((item) => item.agendamentoId === agendamentoId);
  return receipt?.guestAccessToken ?? null;
}

export function clearGuestReceipt(agendamentoId: string): void {
  if (typeof localStorage === 'undefined') return;

  const receipts = readGuestReceipts().filter((item) => item.agendamentoId !== agendamentoId);
  localStorage.setItem(GUEST_BOOKINGS_STORAGE_KEY, JSON.stringify(receipts));
}

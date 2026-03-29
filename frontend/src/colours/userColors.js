/**
 * User accent colors: each username maps to one palette entry globally (same in every workspace).
 */

export const USER_COLOURS = [
    "#a6cee3",
    "#1f78b4",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
    "#6a3d9a",
];

/** Usernames used for AI/system replies (excluded from human color ordering). */
export const KNOWN_AI_CHAT_USERNAMES = new Set([
    "AI Assistant",
    "Query Reformulator",
    "Knowledge Gap Detector",
    "Result Summarizer",
]);

export function isHumanChatParticipant(username, msg) {
    if (!username) return false;
    if (msg && msg.isAIMessage) return false;
    if (KNOWN_AI_CHAT_USERNAMES.has(username)) return false;
    return true;
}

/** Deterministic FNV-1a–style hash for stable cross-workspace color choice. */
function hashUsernameToUInt(username) {
    const s = String(username).trim();
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/**
 * Same color for a given username in every workspace (does not depend on other participants).
 */
export function getColorIndexForUsername(username) {
    if (!username) return 0;
    return hashUsernameToUInt(username) % USER_COLOURS.length;
}

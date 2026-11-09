// Helpers for presenting notes that live in the Recycle bin.

const getRecycledNotes = (notes: any[]) =>
    notes
        .filter((note) => note.recycleBin)
        // Most recently deleted first; legacy notes without deletedAt go last.
        .sort((a, b) => (b.deletedAt || 0) - (a.deletedAt || 0));

const formatDeletedAt = (deletedAt?: number) => {
    if (!deletedAt) return "Deleted earlier";
    const seconds = Math.floor((Date.now() - deletedAt) / 1000);
    if (seconds < 60) return "Deleted just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Deleted ${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Deleted ${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `Deleted ${days}d ago`;
    return `Deleted ${new Date(deletedAt).toLocaleDateString()}`;
};

// Notes store rich-editor HTML; turn it into a short plain-text preview.
const getContentPreview = (content?: string, maxLength = 90) => {
    if (!content) return "";
    const text = content
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};

export { getRecycledNotes, formatDeletedAt, getContentPreview };

// ID/title adapted from the local VanBanAI prototype, src/schema.ts at c4d79c1.
export const documentTypes = Object.freeze({
  device_handover: 'Biên bản bàn giao thiết bị',
});

export type DocumentType = keyof typeof documentTypes;

export function isDocumentType(value: unknown): value is DocumentType {
  return typeof value === 'string' && Object.hasOwn(documentTypes, value);
}

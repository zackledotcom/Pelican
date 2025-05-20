import { ChromaClient } from 'chromadb';
import fs from 'fs';
import path from 'path';

const chroma = new ChromaClient();
const MAX_LENGTH = 10000;

export async function ingestFile(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.length > MAX_LENGTH) {
    content = content.slice(0, MAX_LENGTH);
  }

  await chroma.addDocuments({
    collection: 'uploaded_files',
    documents: [content],
    metadatas: [{ filename: fileName, type: ext }],
  });

  return { status: 'processed', size: content.length };
}

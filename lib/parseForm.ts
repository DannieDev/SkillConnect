import formidable, { Fields, Files } from 'formidable';
import { Readable } from 'stream';
import type { NextRequest } from 'next/server';

export async function parseForm(req: NextRequest): Promise<[Fields, Files]> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, keepExtensions: true });

    const stream = Readable.fromWeb(req.body as unknown as ReadableStream);

    const nodeReq = Object.assign(stream, {
      headers: Object.fromEntries(req.headers.entries())
    });

    form.parse(nodeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve([fields, files]);
    });
  });
}

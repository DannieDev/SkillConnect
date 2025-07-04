// lib/parseForm.ts
import formidable from 'formidable';
import { IncomingMessage } from 'http';

export const parseForm = (req: IncomingMessage): Promise<[any, any]> => {
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });
};

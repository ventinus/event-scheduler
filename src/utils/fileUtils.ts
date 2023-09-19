import { Storage } from "aws-amplify";

export function putStorageObject({
  data,
  dateStr,
}: {
  data: File;
  dateStr: string;
}) {
  const name = formatFileKey(data.name, dateStr);
  return Storage.put(name, data, { contentType: data.type });
}

export const getStorageObject = (opts: {
  fileName: string;
  dateStr: string;
}): Promise<string> => Storage.get(formatFileKey(opts.fileName, opts.dateStr));

const formatFileKey = (fileName: string, date: string) =>
  fileName.replace(".", `-${date}.`);

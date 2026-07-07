export type UploadedDocument = {
  filename: string;
  category: string;
  source_name: string;
  chunks_created: number;
  uploaded_at: string;
};

export type DocumentUploadPayload = {
  file: File;
  category: string;
  source_name: string;
  source_url: string;
  keywords: string;
};

export type DocumentUploadResponse = {
  success: boolean;
  filename: string;
  category: string;
  chunks_created: number;
};

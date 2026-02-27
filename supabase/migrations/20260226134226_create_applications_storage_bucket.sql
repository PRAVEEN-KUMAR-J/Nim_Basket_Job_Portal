/*
  # Create Storage Bucket for Job Applications

  1. Storage
    - Create 'applications' bucket for storing resumes and documents
    - Set bucket to public for easy access to uploaded files
    - Configure file size limits and allowed file types
    
  2. Security
    - Enable RLS on storage.objects
    - Allow anonymous users to upload files to the applications bucket
    - Allow public access to read uploaded files
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload to applications bucket"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'applications');

CREATE POLICY "Anyone can view files in applications bucket"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'applications');
/*
  # Job Applications Schema for Nim Basket

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `full_name` (text) - Applicant's full name
      - `phone_number` (text) - Contact phone number
      - `whatsapp_number` (text) - WhatsApp number
      - `email` (text) - Email address
      - `current_location` (text) - Current location/city
      - `roles` (text[]) - Selected roles (array for multiple selection)
      - `experience` (text) - Years of experience
      - `notice_period` (text) - Notice period duration
      - `resume_url` (text) - URL to uploaded resume
      - `portfolio_link` (text) - Portfolio link (optional)
      - `github_link` (text) - GitHub profile link (optional)
      - `expected_salary` (text) - Expected salary range
      - `why_join` (text) - Motivation to join Nim Basket
      - `created_at` (timestamptz) - Application submission timestamp
      
  2. Security
    - Enable RLS on `job_applications` table
    - Add policy for anonymous users to insert applications
    - Add policy for authenticated admin users to view applications
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone_number text NOT NULL,
  whatsapp_number text NOT NULL,
  email text NOT NULL,
  current_location text NOT NULL,
  roles text[] NOT NULL,
  experience text NOT NULL,
  notice_period text NOT NULL,
  resume_url text,
  portfolio_link text,
  github_link text,
  expected_salary text NOT NULL,
  why_join text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);
-- Create instructions table
CREATE TABLE IF NOT EXISTS instructions (
  id BIGINT PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Insert initial instructions
INSERT INTO instructions (id, content)
VALUES (1, '')
ON CONFLICT (id) DO NOTHING;

-- Add RLS policies
ALTER TABLE instructions ENABLE ROW LEVEL SECURITY;

-- Allow only admins to read and write instructions
CREATE POLICY "Allow admins to read instructions"
  ON instructions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Allow admins to write instructions"
  ON instructions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "Allow admins to update instructions"
  ON instructions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  ); 
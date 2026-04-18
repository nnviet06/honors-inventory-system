-- 1. Add user_id column to equipment
ALTER TABLE equipment ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- 2. Delete existing data to avoid RLS conflicts
DELETE FROM equipment;

-- 3. Enable RLS
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
CREATE POLICY "Users can view own equipment"
  ON equipment FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own equipment"
  ON equipment FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own equipment"
  ON equipment FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own equipment"
  ON equipment FOR DELETE
  USING (user_id = auth.uid());
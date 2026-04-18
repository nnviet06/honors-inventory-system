-- 1. Create counter table
CREATE TABLE user_seq_counters (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    last_seq INTEGER NOT NULL DEFAULT 0
);

-- 2. Backfill counters for existing users
INSERT INTO user_seq_counters (user_id, last_seq)
SELECT DISTINCT user_id, 20
FROM equipment
WHERE user_id IS NOT NULL
ON CONFLICT (user_id) DO NOTHING;

-- 3. Update seed function to also insert counter
CREATE OR REPLACE FUNCTION seed_user_equipment(p_user_id UUID)
RETURNS void AS $$
BEGIN
  -- Monitors (4)
  INSERT INTO equipment (model, equipment_type, location_id, user_id, user_seq) VALUES
  ('Dell P2419H', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON2000'), p_user_id, 1),
  ('HP EliteDisplay E243', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON3000'), p_user_id, 2),
  ('LG UltraWide 29WK600', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON4000'), p_user_id, 3),
  ('ASUS ProArt PA278QV', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON5000'), p_user_id, 4);

  -- Printers (8)
  INSERT INTO equipment (model, equipment_type, location_id, user_id, user_seq) VALUES
  ('HP LaserJet Pro M404n', 'printer', (SELECT id FROM locations WHERE room_name = 'HON2040'), p_user_id, 5),
  ('Canon PIXMA TR8620', 'printer', (SELECT id FROM locations WHERE room_name = 'HON2011'), p_user_id, 6),
  ('Brother MFC-L2750DW', 'printer', (SELECT id FROM locations WHERE room_name = 'HON3001'), p_user_id, 7),
  ('Epson EcoTank ET-4760', 'printer', (SELECT id FROM locations WHERE room_name = 'HON3012'), p_user_id, 8),
  ('HP OfficeJet Pro 9015e', 'printer', (SELECT id FROM locations WHERE room_name = 'HON4022'), p_user_id, 9),
  ('Canon imageCLASS MF445dw', 'printer', (SELECT id FROM locations WHERE room_name = 'HON4015'), p_user_id, 10),
  ('HP LaserJet Pro M428fdw', 'printer', (SELECT id FROM locations WHERE room_name = 'HON5040'), p_user_id, 11),
  ('Epson WorkForce Pro WF-4830', 'printer', (SELECT id FROM locations WHERE room_name = 'HON5015'), p_user_id, 12);

  -- Laptops (5)
  INSERT INTO equipment (model, equipment_type, location_id, user_id, user_seq) VALUES
  ('Dell Elite8', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON1011'), p_user_id, 13),
  ('Dell Elite8', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON4015'), p_user_id, 14),
  ('Dell Elite8', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON3011'), p_user_id, 15),
  ('HP ProBook 450 G9', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON2012'), p_user_id, 16),
  ('Lenovo ThinkPad X1 Carbon', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON5011'), p_user_id, 17);

  -- Keyboards (2)
  INSERT INTO equipment (model, equipment_type, location_id, user_id, user_seq) VALUES
  ('Logitech K380', 'keyboard', (SELECT id FROM locations WHERE room_name = 'HON2015'), p_user_id, 18),
  ('Microsoft Ergonomic', 'keyboard', (SELECT id FROM locations WHERE room_name = 'HON4011'), p_user_id, 19);

  -- Mouse (1)
  INSERT INTO equipment (model, equipment_type, location_id, user_id, user_seq) VALUES
  ('Logitech MX Master 3S', 'mouse', (SELECT id FROM locations WHERE room_name = 'HON3015'), p_user_id, 20);

  -- Initialize counter
  INSERT INTO user_seq_counters (user_id, last_seq) VALUES (p_user_id, 20);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
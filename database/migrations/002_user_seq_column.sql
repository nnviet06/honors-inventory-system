ALTER TABLE equipment ADD COLUMN user_seq INTEGER;

UPDATE equipment
SET user_seq = subquery.rn
FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY id) AS rn
    FROM equipment
) AS subquery
WHERE equipment.id = subquery.id;

ALTER TABLE equipment ALTER COLUMN user_seq SET NOT NULL;

ALTER TABLE equipment ADD CONSTRAINT equipment_user_seq_unique UNIQUE(user_id, user_seq);
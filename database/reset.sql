-- Clears all equipment and user sequence data.
-- Use for development/testing only.
-- WARNING: This deletes ALL user equipment data.

TRUNCATE TABLE equipment RESTART IDENTITY;
TRUNCATE TABLE user_seq_counters;
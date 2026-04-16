-- ========================================
-- FUNCTION: seed_user_equipment_large
-- ========================================
-- Seeds 2000 equipment items for a given user (stress test / performance testing).
-- Mirrors seed_user_equipment() logic but at 100x scale.
-- Run this in Supabase SQL Editor ONCE to create the function.
-- Then call via: supabase.rpc('seed_user_equipment_large', { p_user_id: userId })

CREATE OR REPLACE FUNCTION seed_user_equipment_large(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    loc_ids INTEGER[];
    loc_count INTEGER;
    models TEXT[];
    types TEXT[];
    type_index INTEGER;
    model_index INTEGER;
    i INTEGER;
BEGIN
    -- Get all location IDs into array
    SELECT ARRAY(SELECT id FROM locations ORDER BY id) INTO loc_ids;
    loc_count := array_length(loc_ids, 1);

    -- 5 equipment types with realistic model pools
    types := ARRAY['monitor', 'printer', 'laptop', 'keyboard', 'mouse'];

    -- Model arrays per type (index matches types array)
    -- We'll pick models using modular arithmetic for variety

    FOR i IN 1..2000 LOOP
        -- Cycle through types: ~400 of each
        type_index := ((i - 1) % 5) + 1;

        CASE types[type_index]
            WHEN 'monitor' THEN
                models := ARRAY[
                    'Dell P2419H', 'HP EliteDisplay E243', 'LG UltraWide 29WK600',
                    'ASUS ProArt PA278QV', 'Dell U2722D', 'Samsung Odyssey G5',
                    'BenQ GW2480', 'Acer Nitro XV272U', 'ViewSonic VP2768a',
                    'LG 27UK850-W', 'Dell S2421HS', 'HP M27fw',
                    'ASUS TUF VG27AQ', 'Samsung T350', 'Lenovo ThinkVision T24i'
                ];
            WHEN 'printer' THEN
                models := ARRAY[
                    'HP LaserJet Pro M404n', 'Canon PIXMA TR8620', 'Brother MFC-L2750DW',
                    'Epson EcoTank ET-4760', 'HP OfficeJet Pro 9015e', 'Canon imageRUNNER 2206',
                    'Brother HL-L2350DW', 'Xerox B210', 'HP Color LaserJet Pro M255dw',
                    'Epson WorkForce WF-2860', 'Canon MAXIFY GX7020', 'Brother DCP-L2550DW',
                    'HP LaserJet MFP M234dw', 'Lexmark MB2236adw', 'Ricoh SP C261SFNw'
                ];
            WHEN 'laptop' THEN
                models := ARRAY[
                    'Dell Latitude 5540', 'HP EliteBook 840 G10', 'Lenovo ThinkPad T14s',
                    'MacBook Air M2', 'Dell XPS 13 Plus', 'HP ProBook 450 G10',
                    'Lenovo IdeaPad 5 Pro', 'ASUS ZenBook 14', 'Acer Swift 5',
                    'Microsoft Surface Laptop 5', 'Dell Inspiron 16', 'HP Pavilion Aero 13',
                    'Lenovo ThinkPad X1 Carbon', 'MacBook Pro 14 M3', 'ASUS VivoBook S15'
                ];
            WHEN 'keyboard' THEN
                models := ARRAY[
                    'Logitech MX Keys', 'Dell KB522', 'HP 430 Wireless',
                    'Microsoft Sculpt Ergonomic', 'Lenovo ThinkPad TrackPoint II',
                    'Logitech K380', 'Corsair K70 RGB', 'Razer BlackWidow V4',
                    'Keychron K2 V2', 'Apple Magic Keyboard', 'HyperX Alloy Origins',
                    'SteelSeries Apex Pro', 'Logitech G Pro X', 'Das Keyboard 4 Professional',
                    'Leopold FC660M'
                ];
            WHEN 'mouse' THEN
                models := ARRAY[
                    'Logitech MX Master 3S', 'Dell MS5120W', 'HP 435 Multi-Device',
                    'Microsoft Arc Mouse', 'Logitech M720 Triathlon',
                    'Razer DeathAdder V3', 'Logitech G502 X', 'Apple Magic Mouse',
                    'Corsair Dark Core RGB', 'SteelSeries Rival 600',
                    'Logitech Pebble M750', 'Microsoft Precision Mouse',
                    'Razer Viper Mini', 'Logitech Lift Vertical', 'HP 925 Ergonomic'
                ];
        END CASE;

        model_index := ((i - 1) % array_length(models, 1)) + 1;

        INSERT INTO equipment (model, equipment_type, location_id, user_id, user_seq)
        VALUES (
            models[model_index],
            types[type_index],
            loc_ids[((i - 1) % loc_count) + 1],
            p_user_id,
            i
        );
    END LOOP;

    -- Initialize or update user_seq_counters
    INSERT INTO user_seq_counters (user_id, last_seq)
    VALUES (p_user_id, 2000)
    ON CONFLICT (user_id) DO UPDATE SET last_seq = 2000;
END;
$$ LANGUAGE plpgsql;    
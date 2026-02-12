-- Sample Data for Development/Testing

-- LOCATIONS
-- Floor 1: 2 Offices only
INSERT INTO locations (room_name, building_type) VALUES
('HON1011', 'Office'),
('HON1012', 'Office');

-- Floor 2: 1 Warehouse + 3 Classrooms + 3 Offices
INSERT INTO locations (room_name, building_type) VALUES
('HON2000', 'Warehouse'),
('HON2040', 'Classroom'),
('HON2001', 'Classroom'),
('HON2022', 'Classroom'),
('HON2011', 'Office'),
('HON2012', 'Office'),
('HON2015', 'Office');

-- Floor 3: 1 Warehouse + 3 Classrooms + 3 Offices
INSERT INTO locations (room_name, building_type) VALUES
('HON3000', 'Warehouse'),
('HON3040', 'Classroom'),
('HON3001', 'Classroom'),
('HON3022', 'Classroom'),
('HON3011', 'Office'),
('HON3012', 'Office'),
('HON3015', 'Office');

-- Floor 4: 1 Warehouse + 3 Classrooms + 3 Offices
INSERT INTO locations (room_name, building_type) VALUES
('HON4000', 'Warehouse'),
('HON4040', 'Classroom'),
('HON4001', 'Classroom'),
('HON4022', 'Classroom'),
('HON4011', 'Office'),
('HON4012', 'Office'),
('HON4015', 'Office');

-- Floor 5: 1 Warehouse + 3 Classrooms + 3 Offices
INSERT INTO locations (room_name, building_type) VALUES
('HON5000', 'Warehouse'),
('HON5040', 'Classroom'),
('HON5001', 'Classroom'),
('HON5022', 'Classroom'),
('HON5011', 'Office'),
('HON5012', 'Office'),
('HON5015', 'Office');

-- EQUIPMENT (20 items)
-- Distribution:
-- - 4 Monitors (1 per warehouse on floors 2-5)
-- - 8 Printers (1-2 per floor in classrooms/offices)
-- - 5 Laptops (some with same model)
-- - 2 Keyboards
-- - 1 Mouse

-- MONITORS (4 items) - 1 per warehouse
INSERT INTO equipment (model, equipment_type, location_id) VALUES
('Dell P2419H', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON2000')),
('HP EliteDisplay E243', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON3000')),
('LG UltraWide 29WK600', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON4000')),
('ASUS ProArt PA278QV', 'monitor', (SELECT id FROM locations WHERE room_name = 'HON5000'));

-- PRINTERS (8 items) - distributed across floors
INSERT INTO equipment (model, equipment_type, location_id) VALUES
('HP LaserJet Pro M404n', 'printer', (SELECT id FROM locations WHERE room_name = 'HON2040')),
('Canon PIXMA TR8620', 'printer', (SELECT id FROM locations WHERE room_name = 'HON2011')),
('Brother MFC-L2750DW', 'printer', (SELECT id FROM locations WHERE room_name = 'HON3001')),
('Epson EcoTank ET-4760', 'printer', (SELECT id FROM locations WHERE room_name = 'HON3012')),
('HP OfficeJet Pro 9015e', 'printer', (SELECT id FROM locations WHERE room_name = 'HON4022')),
('Canon imageCLASS MF445dw', 'printer', (SELECT id FROM locations WHERE room_name = 'HON4015')),
('HP LaserJet Pro M428fdw', 'printer', (SELECT id FROM locations WHERE room_name = 'HON5040')),
('Epson WorkForce Pro WF-4830', 'printer', (SELECT id FROM locations WHERE room_name = 'HON5015'));

-- LAPTOPS (5 items) - some with matching models
INSERT INTO equipment (model, equipment_type, location_id) VALUES
('Dell Elite8', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON1011')),
('Dell Elite8', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON4015')),
('Dell Elite8', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON3011')),
('HP ProBook 450 G9', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON2012')),
('Lenovo ThinkPad X1 Carbon', 'laptop', (SELECT id FROM locations WHERE room_name = 'HON5011'));

-- KEYBOARDS (2 items)
INSERT INTO equipment (model, equipment_type, location_id) VALUES
('Logitech K380', 'keyboard', (SELECT id FROM locations WHERE room_name = 'HON2015')),
('Microsoft Ergonomic', 'keyboard', (SELECT id FROM locations WHERE room_name = 'HON4011'));

-- MOUSE (1 item)
INSERT INTO equipment (model, equipment_type, location_id) VALUES
('Logitech MX Master 3S', 'mouse', (SELECT id FROM locations WHERE room_name = 'HON3015'));
-- Insert sample companies
INSERT INTO "core"."Company" ("id", "name", "domain", "isActive", "createdAt", "updatedAt") VALUES
('comp_1', 'Acme Corporation', 'acme.com', true, NOW(), NOW()),
('comp_2', 'TechStart Inc', 'techstart.io', true, NOW(), NOW()),
('comp_3', 'Global Solutions Ltd', 'globalsolutions.com', true, NOW(), NOW()),
('comp_4', 'DataFlow Systems', 'dataflow.net', true, NOW(), NOW());

-- Insert sample users
INSERT INTO "core"."User" ("id", "email", "name", "role", "companyId", "isActive", "createdAt", "updatedAt") VALUES
('user_1', 'admin@acme.com', 'John Admin', 'ADMIN', 'comp_1', true, NOW(), NOW()),
('user_2', 'manager@acme.com', 'Jane Manager', 'MANAGER', 'comp_1', true, NOW(), NOW()),
('user_3', 'user@acme.com', 'Bob User', 'USER', 'comp_1', true, NOW(), NOW()),
('user_4', 'ceo@techstart.io', 'Alice CEO', 'ADMIN', 'comp_2', true, NOW(), NOW()),
('user_5', 'dev@techstart.io', 'Charlie Dev', 'USER', 'comp_2', true, NOW(), NOW());

-- Insert sample configurations
INSERT INTO "config"."Config" ("id", "companyId", "modules", "theme", "aiEnabled", "createdAt", "updatedAt") VALUES
('conf_1', 'comp_1', ARRAY['DASHBOARD', 'OKR', 'TASKS', 'ANALYTICS', 'AI']::config."AppModule"[], 'light', true, NOW(), NOW()),
('conf_2', 'comp_2', ARRAY['DASHBOARD', 'TASKS', 'CRM']::config."AppModule"[], 'light', false, NOW(), NOW()),
('conf_3', 'comp_3', ARRAY['DASHBOARD', 'OKR']::config."AppModule"[], 'light', false, NOW(), NOW()),
('conf_4', 'comp_4', ARRAY['DASHBOARD', 'ANALYTICS', 'AI', 'HR']::config."AppModule"[], 'light', true, NOW(), NOW());

-- Insert sample subscriptions
INSERT INTO "billing"."Subscription" ("id", "companyId", "plan", "status", "tokenLimit", "storageLimit", "usersLimit", "createdAt", "updatedAt") VALUES
('sub_1', 'comp_1', 'ENTERPRISE', 'active', 100000, 10000, 50, NOW(), NOW()),
('sub_2', 'comp_2', 'PROFESSIONAL', 'active', 50000, 5000, 20, NOW(), NOW()),
('sub_3', 'comp_3', 'STARTER', 'trial', 10000, 1000, 5, NOW(), NOW()),
('sub_4', 'comp_4', 'PROFESSIONAL', 'active', 50000, 5000, 20, NOW(), NOW());

-- Insert sample usage data
INSERT INTO "billing"."Usage" ("id", "subscriptionId", "type", "amount", "date") VALUES
('usage_1', 'sub_1', 'tokens', 15420, NOW() - INTERVAL '1 day'),
('usage_2', 'sub_1', 'storage', 2400, NOW() - INTERVAL '1 day'),
('usage_3', 'sub_2', 'tokens', 8750, NOW() - INTERVAL '1 day'),
('usage_4', 'sub_2', 'storage', 1200, NOW() - INTERVAL '1 day'),
('usage_5', 'sub_3', 'tokens', 2100, NOW() - INTERVAL '1 day'),
('usage_6', 'sub_4', 'tokens', 12300, NOW() - INTERVAL '1 day');

-- Insert sample integrations
INSERT INTO "config"."Integration" ("id", "companyId", "type", "name", "config", "isActive", "createdAt", "updatedAt") VALUES
('int_1', 'comp_1', 'CRM', 'Salesforce', '{"apiKey": "encrypted_key_1", "endpoint": "https://api.salesforce.com"}', true, NOW(), NOW()),
('int_2', 'comp_1', 'ANALYTICS', 'Google Analytics', '{"trackingId": "GA-123456", "domain": "acme.com"}', true, NOW(), NOW()),
('int_3', 'comp_2', 'DATABASE', 'PostgreSQL', '{"host": "db.techstart.io", "database": "main"}', true, NOW(), NOW()),
('int_4', 'comp_4', 'SOCIAL_MEDIA', 'Slack', '{"webhookUrl": "https://hooks.slack.com/services/..."}', true, NOW(), NOW());

-- Insert sample app settings
INSERT INTO "config"."AppSettings" ("id", "key", "value", "companyId", "createdAt", "updatedAt") VALUES
('set_1', 'maintenance_mode', 'false', NULL, NOW(), NOW()),
('set_2', 'max_file_size', '10485760', NULL, NOW(), NOW()),
('set_3', 'default_language', 'en', NULL, NOW(), NOW()),
('set_4', 'email_notifications', 'true', 'comp_1', NOW(), NOW()),
('set_5', 'ai_features_enabled', 'true', 'comp_1', NOW(), NOW());

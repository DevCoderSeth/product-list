CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`sale_price` decimal(10,2),
	`unit` varchar(50) NOT NULL DEFAULT 'unit',
	`images` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(255) NOT NULL,
	`date_of_birth` date NOT NULL,
	`gender` enum('male','female') NOT NULL,
	`address` text,
	`phone` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_customers_email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `admins` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`email` varchar(191) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_admins_email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`type` varchar(50),
	`manager_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_locations_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `batches` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`batch_number` varchar(100) NOT NULL,
	`supplier_id` int,
	`cost_price_at_purchase` decimal(10,2) NOT NULL,
	`purchase_date` timestamp NOT NULL,
	`initial_quantity` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `batches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_levels` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`batch_id` int NOT NULL,
	`location_id` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stock_levels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`contact_first_name` varchar(255),
	`contact_last_name` varchar(255),
	`email` varchar(191),
	`phone` varchar(50),
	`address` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `suppliers_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_suppliers_email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `product_suppliers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`supplier_id` int NOT NULL,
	`cost_price` decimal(10,2) NOT NULL,
	CONSTRAINT `product_suppliers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `segments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `segments_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_segments_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `customer_segments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`segment_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `customer_segments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer_attributes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `customer_attributes_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_customer_attributes_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `customer_attributes_links` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`attribute_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `customer_attributes_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wishlists` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`product_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wishlists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cart_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `search_history` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`search_query` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `search_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_actions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`admin_id` int NOT NULL,
	`action_type` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_roles_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_permissions_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`role_id` int NOT NULL,
	`permission_id` int NOT NULL,
	CONSTRAINT `role_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `field_teams` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`supervisor_id` int NOT NULL,
	`location_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `field_teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int NOT NULL,
	`total_price` decimal(10,2) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`verified_by` int,
	`verified_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int NOT NULL,
	`price_at_purchase` decimal(10,2) NOT NULL,
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_assignments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`field_team_id` int NOT NULL,
	`assigned_by` int NOT NULL,
	`assigned_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`payment_method` varchar(50) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`transaction_id` varchar(100),
	`failure_reason` varchar(255),
	`installment_number` int,
	`verified_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`fulfillment_type` enum('delivery','pickup') NOT NULL DEFAULT 'delivery',
	`location_id` int,
	`processed_by` int,
	`carrier` varchar(100),
	`tracking_number` varchar(100),
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`shipped_at` timestamp,
	`delivered_at` timestamp,
	`promised_delivery_by` timestamp,
	`is_delayed` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shipments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shipment_orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`shipment_id` int NOT NULL,
	`order_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shipment_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `locations` ADD CONSTRAINT `locations_manager_id_admins_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `admins`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `batches` ADD CONSTRAINT `batches_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `batches` ADD CONSTRAINT `batches_supplier_id_suppliers_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_levels` ADD CONSTRAINT `stock_levels_batch_id_batches_id_fk` FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_levels` ADD CONSTRAINT `stock_levels_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_suppliers` ADD CONSTRAINT `product_suppliers_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_suppliers` ADD CONSTRAINT `product_suppliers_supplier_id_suppliers_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_segments` ADD CONSTRAINT `customer_segments_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_segments` ADD CONSTRAINT `customer_segments_segment_id_segments_id_fk` FOREIGN KEY (`segment_id`) REFERENCES `segments`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_attributes_links` ADD CONSTRAINT `customer_attributes_links_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_attributes_links` ADD CONSTRAINT `customer_attributes_links_attribute_id_customer_attributes_id_fk` FOREIGN KEY (`attribute_id`) REFERENCES `customer_attributes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `search_history` ADD CONSTRAINT `search_history_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `admin_actions` ADD CONSTRAINT `admin_actions_admin_id_admins_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `field_teams` ADD CONSTRAINT `field_teams_supervisor_id_admins_id_fk` FOREIGN KEY (`supervisor_id`) REFERENCES `admins`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `field_teams` ADD CONSTRAINT `field_teams_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_verified_by_admins_id_fk` FOREIGN KEY (`verified_by`) REFERENCES `admins`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_assignments` ADD CONSTRAINT `order_assignments_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_assignments` ADD CONSTRAINT `order_assignments_field_team_id_field_teams_id_fk` FOREIGN KEY (`field_team_id`) REFERENCES `field_teams`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_assignments` ADD CONSTRAINT `order_assignments_assigned_by_admins_id_fk` FOREIGN KEY (`assigned_by`) REFERENCES `admins`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_verified_by_admins_id_fk` FOREIGN KEY (`verified_by`) REFERENCES `admins`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shipments` ADD CONSTRAINT `shipments_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shipments` ADD CONSTRAINT `shipments_processed_by_field_teams_id_fk` FOREIGN KEY (`processed_by`) REFERENCES `field_teams`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shipment_orders` ADD CONSTRAINT `shipment_orders_shipment_id_shipments_id_fk` FOREIGN KEY (`shipment_id`) REFERENCES `shipments`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shipment_orders` ADD CONSTRAINT `shipment_orders_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_products_name` ON `products` (`name`);--> statement-breakpoint
CREATE INDEX `idx_products_category` ON `products` (`category`);--> statement-breakpoint
CREATE INDEX `idx_admins_role_id` ON `admins` (`role_id`);--> statement-breakpoint
CREATE INDEX `idx_locations_manager_id` ON `locations` (`manager_id`);--> statement-breakpoint
CREATE INDEX `idx_batches_product_id` ON `batches` (`product_id`);--> statement-breakpoint
CREATE INDEX `idx_batches_supplier_id` ON `batches` (`supplier_id`);--> statement-breakpoint
CREATE INDEX `idx_batches_batch_number` ON `batches` (`batch_number`);--> statement-breakpoint
CREATE INDEX `idx_stock_levels_batch_id` ON `stock_levels` (`batch_id`);--> statement-breakpoint
CREATE INDEX `idx_stock_levels_location_id` ON `stock_levels` (`location_id`);--> statement-breakpoint
CREATE INDEX `idx_suppliers_company_name` ON `suppliers` (`company_name`);--> statement-breakpoint
CREATE INDEX `idx_product_suppliers` ON `product_suppliers` (`product_id`,`supplier_id`);--> statement-breakpoint
CREATE INDEX `idx_customer_segments` ON `customer_segments` (`customer_id`,`segment_id`);--> statement-breakpoint
CREATE INDEX `idx_customer_attributes_links` ON `customer_attributes_links` (`customer_id`,`attribute_id`);--> statement-breakpoint
CREATE INDEX `idx_wishlists_customer_product` ON `wishlists` (`customer_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `idx_cart_items_customer_product` ON `cart_items` (`customer_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `idx_search_history_customer` ON `search_history` (`customer_id`);--> statement-breakpoint
CREATE INDEX `idx_admin_actions_admin_id` ON `admin_actions` (`admin_id`);--> statement-breakpoint
CREATE INDEX `idx_admin_actions_created_at` ON `admin_actions` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_role_permissions` ON `role_permissions` (`role_id`,`permission_id`);--> statement-breakpoint
CREATE INDEX `idx_field_teams_supervisor_id` ON `field_teams` (`supervisor_id`);--> statement-breakpoint
CREATE INDEX `idx_field_teams_location_id` ON `field_teams` (`location_id`);--> statement-breakpoint
CREATE INDEX `idx_orders_customer_id` ON `orders` (`customer_id`);--> statement-breakpoint
CREATE INDEX `idx_orders_verified_by` ON `orders` (`verified_by`);--> statement-breakpoint
CREATE INDEX `idx_order_items_order_id` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_order_items_product_id` ON `order_items` (`product_id`);--> statement-breakpoint
CREATE INDEX `idx_order_assignments` ON `order_assignments` (`order_id`,`field_team_id`);--> statement-breakpoint
CREATE INDEX `idx_payments_order_id` ON `payments` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_payments_verified_by` ON `payments` (`verified_by`);--> statement-breakpoint
CREATE INDEX `idx_shipments_location_id` ON `shipments` (`location_id`);--> statement-breakpoint
CREATE INDEX `idx_shipments_processed_by` ON `shipments` (`processed_by`);--> statement-breakpoint
CREATE INDEX `idx_shipment_orders` ON `shipment_orders` (`shipment_id`,`order_id`);
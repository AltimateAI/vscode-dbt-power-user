select id, name, category, description, price, quantity_in_stock, supplier_id, warehouse_location from {{ source('inventory_management_system', 'product_catalog_items') }} where quantity_in_stock > 0

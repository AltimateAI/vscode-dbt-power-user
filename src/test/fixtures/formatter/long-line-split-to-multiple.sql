select order_id, customer_id, order_date, status, total_amount, shipping_address, billing_address, payment_method, discount_code, tax_amount from orders where status != 'cancelled'

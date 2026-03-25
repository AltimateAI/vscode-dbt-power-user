/*
  ******************************************************************************
  *               _____          _____       _                                 *
  *              / ____|        / ____|     | |                                *
  *             | |  __  ___   | (___   __ _| | ___  ___                       *
  *             | | |_ |/ _ \   \___ \ / _` | |/ _ \/ __|                      *
  *             | |__| | (_) |  ____) | (_| | |  __/\__ \                      *
  *              \_____|\___/  |_____/ \__,_|_|\___||___/                      *
  *                                                                            *
  ******************************************************************************
  * Path:           models/04-mrt
  * Program:        t_mrt_sales.sql
  * Project:        dbt_core_sample_duckdb
  * Description:    Mart sales model combining fact and dimension tables
  * Author:         Manzar Ahmed
  * First Created:  Jun 2025
  ******************************************************************************
  * Program history:
  ******************************************************************************
  * Date        Programmer             Description
  * ----------  ---------------------- -----------------------------------------
  * 2025-06-11  Manzar Ahmed           v0.01/Initial version
  ******************************************************************************
*/
{%- set high_date = '9999-12-31 00:00:00' %}

with fact as (
    select *
    from {{ ref('t_fct_sales') }}
),

order_methods as (
    select *
    from {{ ref('t_dim_order_methods') }}
),

product as (
    select *
    from {{ ref('t_dim_products') }}
    where end_ts = ('{{ high_date }}')::timestamp
),

retailer as (
    select *
    from {{ ref('t_dim_retailers') }}
    where end_ts = ('{{ high_date }}')::timestamp
)

select
    -- Fact fields
    f.fct_sales_sk,
    f.transaction_date,
    f.quantity,
    f.unit_price,
    f.unit_sale_price,

    -- Order Method dimension
    om.order_method_code,
    om.order_method_type,

    -- Product dimension
    p.product_number,
    p.product_line,
    p.product_type,
    p.product,
    p.product_brand,
    p.product_color,

    -- Retailer dimension
    r.retailer_code,
    r.retailer_name,
    r.country as retailer_country,
    r.type as retailer_type

from fact as f
left join order_methods as om
    on f.dim_order_method_sk = om.dim_order_method_sk

left join product as p
    on f.dim_product_sk = p.dim_product_sk

left join retailer as r
    on f.dim_retailer_sk = r.dim_retailer_sk

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
  * Path:           models/03-det
  * Program:        t_dim_products.sql
  * Project:        dbt_core_sample_duckdb
  * Description:    SCD2 dimension model for GO Sales products with surrogate 
  *                 key and change hash
  * Author:         Manzar Ahmed
  * First Created:  Jul 2025
  ******************************************************************************
  * Program history:
  ******************************************************************************
  * Date        Programmer             Description
  * ----------  ---------------------- -----------------------------------------
  * 2025-06-11  Manzar Ahmed           v0.01/Initial version
  * 2025-06-23  Manzar Ahmed           v0.02/Utilising SCD2 vars for start and 
  *                                    end timestamps
  * 2025-06-23  Manzar Ahmed           v0.03/SonarQube issues fixed:
  *                                    Define a constant instead of duplicating 
  *                                    this literal 5 times (plsql:S1192)
  * 2025-07-07  Manzar Ahmed           v0.04/Added version number, 
  *                                    current_version and prior surrogate key 
  *                                    to SCD2
  * 2025-08-07  Manzar Ahmed           v0.05/scd2 enhancements, added
  ******************************************************************************
*/

{{ config(
    materialized = 'incremental',
    schema = 'det',
    unique_key = ['dim_product_sk'],
    pre_hook = ["create sequence if not exists seq_dim_product_sk start 1 increment 1"]
) }}

{% set vars = get_scd2_vars() %}
{% set start_ts = "('" ~ vars.start_ts ~ "')::timestamp" %}
{% set end_ts = "('" ~ vars.end_ts ~ "')::timestamp" %}
{% set high_date_ts = "('" ~ vars.high_date ~ "')::timestamp" %}

with current_data as (
    select
        *,
            {{ scd2_hash([
            'product_number',        
            'product_line',
            'product_type',
            'product',
            'product_brand',
            'product_color',
            'cast(unit_cost as decimal(18,2))',
            'cast(unit_price as decimal(18,2))'
        ]) }} as scd2_hash
    from {{ ref('t_stg_go_products') }}
)

{% if is_incremental() %}
    ,

    existing_records as (
        select *
        from {{ this }}
        where current_version = true
    ),

    ordered_changes as (
        select
            c.product_number,
            c.product_line,
            c.product_type,
            c.product,
            c.product_brand,
            c.product_color,
            c.unit_cost,
            c.unit_price,
            c.scd2_hash,
            e.dim_product_sk as prior_dim_product_sk,
            coalesce(e.version_number, 0) + 1 as version_number
        from current_data as c
        left join existing_records as e
            on c.product_number = e.product_number
        where
            e.product_number is null
            or c.scd2_hash != e.scd2_hash
        order by c.product_number
    ),

    changes as (
        select
            nextval('seq_dim_product_sk') as dim_product_sk,
            oc.product_number,
            oc.product_line,
            oc.product_type,
            oc.product,
            oc.product_brand,
            oc.product_color,
            oc.unit_cost,
            oc.unit_price,
            oc.scd2_hash,
            {{ start_ts }} as start_ts,
            {{ high_date_ts }} as end_ts,
            oc.version_number,
            true as current_version,
            oc.prior_dim_product_sk
        from ordered_changes as oc
    ),

    updates as (
        select
            e.dim_product_sk,
            e.product_number,
            e.product_line,
            e.product_type,
            e.product,
            e.product_brand,
            e.product_color,
            e.unit_cost,
            e.unit_price,
            e.scd2_hash,
            e.start_ts,
            {{ end_ts }} as end_ts,
            e.version_number,
            false as current_version,
            e.prior_dim_product_sk
        from existing_records as e
        inner join changes as c
            on e.product_number = c.product_number
        where e.current_version = true
    )

    select * from changes
    union all
    select * from updates

{% else %}

select  nextval('seq_dim_product_sk') as dim_product_sk,
        product_number,
        product_line,
        product_type,
        product,
        product_brand,
        product_color,
        unit_cost,
        unit_price,
        scd2_hash,
        {{ start_ts }} as start_ts,
        {{ high_date_ts }} as end_ts,
        1 as version_number,
        true as current_version,
        -1 as prior_dim_product_sk
from    current_data
order by product_number

{% endif %}

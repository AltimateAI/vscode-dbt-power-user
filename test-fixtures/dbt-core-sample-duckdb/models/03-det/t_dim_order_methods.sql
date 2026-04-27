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
  * Program:        t_dim_order_methods
  * Project:        dbt_core_sample_duckdb
  * Description:    SCD1 dimension model for GO Sales order methods with 
  *                 surrogate key and audit columns
  * Author:         Manzar Ahmed
  * First Created:  Jul 2025
  ******************************************************************************
  * Program history:
  ******************************************************************************
  * Date        Programmer             Description
  * ----------  ---------------------- -----------------------------------------
  * 2025-07-06  Manzar Ahmed           v0.01/Initial version
  ******************************************************************************
*/

{{ config(
    materialized = 'incremental',
    schema = 'det',
    unique_key = 'order_method_code',
    pre_hook = ["create sequence if not exists 
                  seq_dim_order_method_sk start 1 increment 1"
             ]
) }}

with source_data as (
    select
        order_method_code,
        order_method_type
    from {{ ref('t_stg_go_methods') }}
    order by order_method_code
)

{% if is_incremental() %}

    , existing_data as (
        select
            order_method_code,
            order_method_type,
            dim_order_method_sk,
            create_ts,
            update_ts
        from {{ this }}
    ),

    new_or_changed as (
        select
            s.order_method_code,
            s.order_method_type,
            coalesce(
                e.dim_order_method_sk, nextval('seq_dim_order_method_sk')
            ) as dim_order_method_sk,
            coalesce(e.create_ts, current_timestamp) as create_ts,
            current_timestamp as update_ts
        from source_data as s
        left join existing_data as e
            on s.order_method_code = e.order_method_code
        where
            e.order_method_code is null
            or s.order_method_type != e.order_method_type
    )

    select * from new_or_changed

{% else %}

select
    nextval('seq_dim_order_method_sk') as dim_order_method_sk,
    order_method_code,
    order_method_type,
    current_timestamp as create_ts,
    current_timestamp as update_ts
from source_data

{% endif %}

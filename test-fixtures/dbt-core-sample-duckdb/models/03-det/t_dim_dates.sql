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
  * Program:        t_dim_dates.sql
  * Project:        dbt_core_sample_duckdb
  * Description:    Staging model for GO Sales products
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
    materialized = 'table',
    schema = 'det'
) }}

with date_span as (
    select cast('2000-01-01' as date) + cast(i as integer) as full_date
    from range(0, 365 * 50)
),

dim_dates as (
    select
        cast(full_date as date) as date_key,
        full_date,
        cast(strftime('%Y', full_date) as integer) as year,
        cast(strftime('%m', full_date) as integer) as month,
        cast(strftime('%d', full_date) as integer) as day,
        cast(strftime('%W', full_date) as integer) as week_of_year,
        cast(strftime('%w', full_date) as integer) as weekday_number,
        cast(strftime('%j', full_date) as integer) as day_of_year,
        strftime('%Y-%m', full_date) as month_label,
        strftime('%Y-%W', full_date) as week_label,
        strftime('%Y-Q', full_date)
        || cast(
            (
                (cast(strftime('%m', full_date) as integer) - 1) / 3 + 1
            ) as integer
        ) as quarter_label,
        coalesce(strftime('%w', full_date) in ('0', '6'), false) as is_weekend,
        coalesce(strftime('%w', full_date) in ('1', '2', '3', '4', '5'),
        false) as is_weekday
    from date_span
)

select * from dim_dates

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
  * Path:           models/02-stg
  * Program:        t_stg_go_1k.sql
  * Project:        dbt_core_sample_duckdb
  * Description:    Staging model for GO Sales products transactions
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

select
    "Retailer code" as retailer_code,
    "Product number" as product_number,
    date::date as transaction_date,
    quantity

from {{ ref('t_raw_go_1k') }}

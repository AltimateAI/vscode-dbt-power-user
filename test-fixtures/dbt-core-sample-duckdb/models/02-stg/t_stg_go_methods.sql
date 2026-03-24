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
  * Program:        t_stg_go_methods.sql
  * Project:        dbt_core_sample_duckdb
  * Description:    Staging model for GO Sales order methods
  * Author:         Manzar Ahmed
  * First Created:  Jun 2025
  ******************************************************************************
  * Program history:
  ******************************************************************************
  * Date        Programmer             Description
  * ----------  ---------------------- -----------------------------------------
  * 2025-06-11  Manzar Ahmed           v0.01/Initial version
  * 2025-06-12  Manzar Ahmed           v0.02/Run from seed instead of source
  ******************************************************************************
*/

select
    "Order method code" as order_method_code,
    "Order method type" as order_method_type
from {{ ref('ref_go_methods') }}

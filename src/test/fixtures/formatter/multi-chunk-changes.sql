with
    source as (select * from {{ source("raw", "payments") }}),

    renamed as (
        select
            id as payment_id,
            ORDER_ID as order_id,
            amount as payment_amount
        from source
    ),

    aggregated as (
        select
            order_id,
            sum(payment_amount) as total_paid,
            count(*) as payment_count
        from renamed
        group by order_id
    ),

    final as (
        select
            order_id,
            total_paid,
            payment_count,
            CASE WHEN total_paid > 100 THEN 'high' WHEN total_paid > 50 THEN 'medium' ELSE 'low' END as tier
        from aggregated
        where total_paid > 0
    )

select *
from final

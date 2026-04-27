with

    cte1 as (

        select src.*
        from {{ source("my_looooooooooooooong_source_schema_name", "my_table_name") }} as src

    ),

    cte2 as (

        select
            my_looooooooooooooooooooooooong_column_name1 as my_loooooooong_alias0,
        from cte1

    ),

    cte3 as (

        select
            my_looooooooooooooooooooooooong_column_name1 as my_loooooooong_alias1,
            my_looooooooooooooooooooooooong_column_name2 as my_loooooooong_alias2,
            my_looooooooooooooooooooooooong_column_name3 as my_loooooooong_alias3,
            my_looooooooooooooooooooooooong_column_name4 as my_loooooooong_alias4,
            my_looooooooooooooooooooooooong_column_name5 as my_loooooooong_alias5,
            my_column_name1,
            my_looooooooooooooooooooooooong_column_name6
            as my_loooooooong_alias6,
            my_looooooooooooooooooooooooong_column_name7
            as my_loooooooong_alias7,
            my_column_name2,
            my_column_name3
        from
            cte2

    )

select
    my_arbitrary_function(
        my_nested_function('my_loooooooonooooooog_string', d.my_column_name1)
    ) as my_column_name4
from cte3 as d

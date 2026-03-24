{%- macro scd2_hash(field_list) -%}
    {%- set default_null_value = '_null_' -%}

    {%- set fields = [] -%}

    {%- for field in field_list -%}
        {%- do fields.append(
            "coalesce(cast(" ~ field ~ " as " ~ dbt.type_string() ~ "), '" ~ default_null_value  ~"')"
        ) -%}
        {%- if not loop.last %}
            {%- do fields.append("'|'") -%}
        {%- endif -%}
    {%- endfor -%}

    {{ dbt.hash(dbt.concat(fields)) }}
{%- endmacro -%}

{% macro get_scd2_vars(format='%Y-%m-%d %H:%M:%S') %}

  {% set datetime = modules.datetime %}
  {% set start_ts = datetime.datetime.now().replace(microsecond=0) %}
  {% set end_ts = start_ts - datetime.timedelta(seconds=1) %}
  {% set high_date = '9999-12-31 00:00:00' %}
  {% set result = {
      "start_ts": start_ts.strftime(format),
      "end_ts": end_ts.strftime(format),
      "high_date": high_date
  } %}
  {{ return(result) }}
  
{% endmacro %}
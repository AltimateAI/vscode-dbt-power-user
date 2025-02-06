# import json
# from dbt_healthcheck import project_healthcheck

# config = {"version":"v1","insights":{"Duplicate_Sources":{},"column_names_use_double_quotes":{}},"disabled_insights":["source_staging_model_integrity","downstream_source_dependence","model_fanout","root_model","source_fanout","staging_models_dependency","staging_models_on_staging","unused_sources","multiple_sources_joined","hard_coded_references","rejoining_upstream_concepts","exposures_dependent_on_private_models","undocumented_public_models","public_models_without_contracts","chain_view_linking","exposure_parent_bad_materialization","missing_documentation","documentation_on_stale_columns","missing_primary_key_tests","dbt_low_test_coverage","model_directory_structure","model_naming_convention_check","source_directory_structure","test_directory_structure","column_descriptions_are_same","column_name_contract","check_macro_args_have_desc","check_macro_has_desc","check_model_has_all_columns","check_model_has_valid_meta_keys","check_model_has_properties_file","check_model_has_tests_by_name","check_model_has_tests_by_type","check_model_has_tests_by_group","check_model_materialization_by_childs","model_name_by_folder","check_model_parents_and_childs","check_model_parents_database","check_model_parents_schema","check_source_childs","check_source_columns_have_desc","check_source_has_all_columns","check_source_has_freshness","check_source_has_loader","check_source_has_meta_keys","check_source_has_tests_by_type","check_source_has_tests","check_source_table_has_desc","check_source_tags","model_and_column_names_capitalized","model_and_column_names_capitalized"],"model_type_patterns":{"base":"^base_.*","mart":"^(mrt_|mart_|fct_|dim_).*","staging":"^stg_.*","intermediate":"^int_.*"}}
# result = project_healthcheck("./target/manifest.json", "./target/catalog.json", None, config, '5c8695316501665e254e302ad081f000', 'pricing1', 'https://api.tryaltimate.com')
# print(json.dumps(result, indent=4))

from itertools import permutations

def is_valid_pattern(pattern):
    skip_map = {
        (1, 3): 2, (1, 7): 4, (1, 9): 5, (2, 8): 5, (3, 7): 5, (3, 9): 6,
        (4, 6): 5, (7, 9): 8, (1, 6): 5, (2, 7): 4, (3, 8): 5, (4, 9): 5,
    }
    visited = set(pattern[:4])
    for i in range(len(pattern) - 1):
        start, end = pattern[i], pattern[i + 1]
        if (start, end) in skip_map or (end, start) in skip_map:
            intermediate = skip_map.get((start, end), skip_map.get((end, start), None))
            if intermediate and intermediate not in visited:
                return False
        visited.add(end)
    return True

def generate_patterns():
    prefix = [7, 4, 1, 2]
    remaining_digits = [3, 5, 6, 8, 9]
    valid_patterns = []
    
    # Generate patterns of lengths 5 to 9
    for length in range(5, 10):
        additional_digits = length - len(prefix)
        for perm in permutations(remaining_digits, additional_digits):
            pattern = prefix + list(perm)
            if is_valid_pattern(pattern):
                valid_patterns.append(pattern)
    
    return valid_patterns

if __name__ == "__main__":
    patterns = generate_patterns()
    print(f"Found {len(patterns)} valid patterns:")
    for pattern in patterns:
        print('-'.join(map(str, pattern)))
def project_healthcheck(
    manifest_path, catalog_path=None, config_path=None, config=None
):
    try:
        import logging
        import json

        from datapilot.config.config import load_config
        from datapilot.core.platforms.dbt.utils import load_catalog
        from datapilot.core.platforms.dbt.utils import load_manifest
        from datapilot.core.platforms.dbt.constants import MODEL
        from datapilot.core.platforms.dbt.executor import DBTInsightGenerator

        logging.basicConfig(level=logging.INFO)
        manifest = load_manifest(manifest_path)
        catalog = load_catalog(catalog_path) if catalog_path else None
        if not config and config_path:
            config = load_config(config_path)
        insight_generator = DBTInsightGenerator(
            manifest=manifest,
            catalog=catalog,
            config=config,
        )
        reports = insight_generator.run()

        # package_insights = reports[PROJECT]
        model_insights = {
            k: [json.loads(item.json()) for item in v]
            for k, v in reports[MODEL].items()
        }
        return {"model_insights": model_insights}
    except Exception as e:
        raise Exception(str(e))

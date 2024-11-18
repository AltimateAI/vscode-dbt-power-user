from typing import Optional

def project_healthcheck(
    manifest_path, catalog_path=None, config_path=None, config=None, token=None, tenant=None, backend_url: Optional[str] = None,
):
    try:
        import logging
        import json

        from datapilot.config.config import load_config
        from datapilot.core.platforms.dbt.utils import load_catalog
        from datapilot.core.platforms.dbt.utils import load_manifest
        from datapilot.core.platforms.dbt.constants import MODEL, LLM
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
            token=token,
            instance_name=tenant,
            backend_url=backend_url,
        )
        reports = insight_generator.run()

        # package_insights = reports[PROJECT]
        model_insights = {
            k: [json.loads(item.json()) for item in v]
            for k, v in reports[MODEL].items()
        }

        llm_reports = reports[LLM]
        llm_insights = {}
        for report in llm_reports:
            location = report["answer"]["Location"]
            if location not in llm_insights:
                llm_insights[location] = []
            llm_insights[location].append(
                {
                    "name": report["name"],
                    "rule": report["answer"]["Rule"],
                    "issue": report["answer"]["Issue"],
                    "fix": report["answer"]["Fix"],
                }
            )

        return {"model_insights": model_insights, "llm_insights": llm_insights}
    except Exception as e:
        raise Exception(str(e))

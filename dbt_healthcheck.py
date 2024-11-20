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
            for answer in report["answer"]:
                location = answer["unique_id"]
                if location not in llm_insights:
                    llm_insights[location] = []
                    metadata = answer.get("metadata", {})
                    metadata["source"] = LLM
                llm_insights[location].append(
                    {
                        "insights": {
                            "type": report["type"],
                            "name": report["name"],
                            "message": answer["message"],
                            "reason_to_flag": answer["reason_to_flag"],
                            "recommendation": answer["recommendation"],
                            "metadata": metadata
                        },
                        "severity": answer["severity"],
                        "path": answer["path"],
                        "original_file_path": answer["original_file_path"],
                        "package_name": answer["package_name"],
                        "unique_id": answer["unique_id"],
                    }
                )

        # Combine llm_insights into model_insights
        for key, value in llm_insights.items():
            if key in model_insights:
                model_insights[key].extend(value)
            else:
                model_insights[key] = value

            return {"model_insights": model_insights}
    except Exception as e:
        raise Exception(str(e))

# Accelerate dbt and SQL Development by 3x

/// admonition | The Power User extension is also available on Cursor! [Click here](https://www.cursor.com/how-to-install-extension) to learn how to install the extension for Cursor.
type: info
///

Welcome to the docs for [dbt Power User VSCode Extension](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user), an [open sourced](https://github.com/AltimateAI/vscode-dbt-power-user) extension created by [Altimate AI](https://www.altimate.ai/).

It offers various features across three important phases of dbt and SQL work - develop, test, and collaborate.

<div class="html-in-md">

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accelerate dbt and SQL Development by 3x</title>
    <style>
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 15px;
            background: linear-gradient(145deg, var(--bg-secondary), var(--bg-primary));
            border-radius: 20px;
            -webkit-background-clip: text;
            -webkit-text-fill-color: text;
            box-shadow: 0 10px 30px var(--shadow-color);
        }
        .workflow {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
        }
        .steps {
            display: flex;
            justify-content: space-between;
            width: 100%;
            position: relative;
            margin-bottom: 20px;
        }
        .step {
            background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
            font-size: 20px;
            padding: 10px;
            border-radius: 12px;
            text-align: center;
            z-index: 1;
            width: 45%;
            box-shadow: 0 4px 20px rgba(66, 133, 244, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .step:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(66, 133, 244, 0.4);
        }
        .details {
            display: flex;
            justify-content: space-between;
            gap: 20px;
        }
        .column {
            width: 45%;
            padding: 10px;
            border-radius: 15px;
            background: transparent;
            position: relative; 
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 15px var(--shadow-color);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .column:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        ul {
            /* padding-left: 20px;
            margin: 0; */
        }
        li {
            margin-bottom: 15px;
            position: relative;
            padding-left: 10px;
        }
        li:last-child {
            margin-bottom: 0;
        }
        a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s ease;
            position: relative;
        }
        a:hover {
            color: var(--gradient-end);
        }
        a::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -2px;
            left: 0;
            background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
        }
        a:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
        .connecting-line {
            width: 3px;
            height: 20px;
            background: linear-gradient(180deg, var(--gradient-start), var(--gradient-end));
            margin: 0 auto;
            box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">        
        <div class="workflow">
            <div class="steps">
                <div class="arrow"></div>
                <div class="step">Develop</div>
                <div class="step">Test</div>
                <div class="step">Collaborate</div>
            </div>
        </div>
        <div class="details">
            <div class="column">
                <ul>
                    <li><a href="test/sqlvisualizer">SQL Visualizer</a></li>
                    <li><a href="develop/explanation">Query Explanation</a></li>
                    <li><a href="develop/genmodelsource">Auto-gen dbt from source</a></li>
                    <li><a href="develop/genmodelSQL">Auto-gen dbt from SQL</a> </li>
                    <li><a href="develop/autocomplete">Auto-complete code</a> </li>
                    <li><a href="develop/clicktorun"> Click to Run Models</a></li>
                    <li><a href="develop/translateSQL">Query Translation</a></li>
                    <li><a href="develop/compiledCode">Compiled SQL preview</a></li>
                </ul>
            </div>
            <div class="column">
                <ul>
                    <li><a href="test/queryResults">Preview query results and analysis</a></li>
                    <li><a href="test/writetests">Tests Generation</a></li>
                    <li><a href="test/lineage">Column lineage with code visibility</a></li>
                    <li><a href="test/defertoprod">Defer to prod</a></li>
                    <li><a href="test/sqlvalidation">SQL validation without execution</a></li>
                </ul>
            </div>
            <div class="column">
                <ul>
                    <li><a href="govern/collaboration">Collaboration workflows</a></li>
                    <li><a href="document/generatedoc">Documentation generation</a></li>
                    <li><a href="govern/governance">Project governance in IDE, Git, CI/CD</a></li>
                    <li><a href="discover/viewlineage">SaaS UI for dbt docs and lineage</a></li>
                    <li><a href="govern/querybookmarks">Query history and Query bookmarks</a></li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>

</div>

## DataMates with AI Teammates

The Power User extension is part of the DataMates Platform. DataMates Platform offers the functionality to automate and accelerate the work of data teams in various areas
of platform engineering, data engineering, and analytics engineering. DataMates Platform consists of many AI teammates to help data teams with their work. For example, there is a documentation generator teammate that's specifically developed to handle data documentation work.

These AI teammates are available as part of the power user extension to offer the functionality ranging from dbt models, docs, tests generation to SQL translation & explanation. AI teammates can be coached by you and personalized for your specific requirements. To learn more - please check this section on [coaching AI teammates](./teammates/coach.md).

<br>
## Feature Comparison

The dbt Power User Extension has great features out of the box. Add a free [Altimate api key](setup/reqdConfig.md#enable-saas-features-by-adding-api-key) to unlock all the features in "With Altimate AI Key" below.

<div class="html-in-md">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feature Comparison</title>
</head>
<body>
    <div class="container">        
        <div class="workflow">
            <div class="steps">
                <div class="arrow"></div>
                <div class="step">dbt Power Users Extension</div>
                <div class="step">With Altimate AI Key</div>
            </div>
        </div>
        <div class="details">
            <div class="column">
                <ul>
                    <li><a href="test/sqlvisualizer">SQL Visualizer</a></li>
                    <li><a href="test/lineage/#model-lineage">Data Lineage: Model Level </a></li>
                    <li><a href="develop/genmodelsource">Auto-gen dbt from source</a></li>
                    <li><a href="develop/autocomplete">Auto-complete code</a> </li>
                    <li><a href="develop/clicktorun">Click to Run Models</a></li>
                    <li><a href="develop/compiledCode">Compiled SQL preview</a></li>
                    <li><a href="test/queryResults">Preview query results and analysis</a></li>
                    <li><a href="test/defertoprod">Defer to prod</a></li>
                    <li><a href="test/sqlvalidation">SQL validation without execution</a></li>
                </ul>
            </div>
            <div class="column">
                <ul>
                    <li><a href="cursor/examples">MCP Server Tools</a></li> 
                    <li><a href="test/lineage/#column-lineage">Data Lineage: Column Level </a></li>
                    <li><a href="develop/explanation">Query Explanation AI</a></li>
                    <li><a href="develop/translateSQL">Query Translation AI</a></li>
                    <li><a href="develop/genmodelSQL">Auto-gen dbt from SQL</a> </li>
                    <li><a href="test/writetests">Tests Generation AI</a></li>
                    <li><a href="document/generatedoc">Documentation Generation AI</a></li>
                    <li><a href="teammates/coach">Coach & Personalize AI Teammates</a></li>
                    <li><a href="govern/collaboration#start-a-discussion">Code Collaboration</a></li>
                    <li><a href="govern/collaboration#start-a-discussion_1">Documentation Collaboration</a></li>
                    <li><a href="govern/collaboration#lineage-export-workflow">Data Lineage - Export</a></li>
                    <li><a href="govern/collaboration#view-lineage-in-saas">Data Lineage - SaaS UI</a></li>
                    <li><a href="govern/governance#configure-checks">Project Governance - VS Code </a></li>              
                    <li><a href="govern/governance#available-via-extension-python-package">Project Governance - CI/CD </a></li>              
                    <li><a href="govern/governance#saas-configuration-of-checks">Project Governance - SaaS UI</a></li>         
                    <li><a href="discover/viewlineage">dbt Docs - SaaS UI (dbt core or cloud)</a></li>
                    <li><a href="govern/querybookmarks">Query History</a></li>
                    <li><a href="govern/querybookmarks">Query Bookmarks</a></li>
                    <li><a href="govern/querybookmarks">Query Sharing</a></li>
                    
                </ul>
            </div>
        </div>
    </div>
</body>
</html>

</div>

## Support

Power user extension and DataMates Platform is developed and maintained by [Altimate AI team](https://www.altimate.ai).
Please join the dbt Community Slack Channel [#tools-dbt-power-user](https://getdbt.slack.com/archives/C05KPDGRMDW) to meet with the community of users of the extension.

If you run into issues, please [contact us](https://www.altimate.ai/support) via Slack or chat

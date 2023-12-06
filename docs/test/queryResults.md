You can preview the resulting data from your code with the extension, export it as CSV and do further analysis. You can also view compiled SQL query.

## Preview results, export and analyze

You can preview results for the entire dbt model or select part of the dbt model to preview results only for that selection. After you select, Press Cmd+Enter (Mac) or Control+Enter (Windows/Linux) to run a query.

<interactive demo of preview query results>

<div style="position: relative; padding-bottom: calc(60.84217448487505% + 44px); height: 0;"><iframe src=https://app.supademo.com/embed/S4uCGtgs_jisbJs5SfJzZ frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Note: You can also execute "preview query results" operation from the toolbar on the top right corner, by click on the "play" button.

![preview results from toolbar](images/previewresultsToolbar.png)

Note: There is a copy SQL button that you can utilize as well, it becomes visible only when you hover over the top right corner.

![copy sql button](images/copysqlbutton.png)

## Configure settings for query preview

Query preview is limited to 500 rows by default, this can be configured in Settings area or you can configure query results options in "Help" tab in the bottom panel as below.

You can also change table zoom level with 'scale' setting so you can see more columns in a single view or you can clear results by clicking “clear results” button.

![Query results settings](images/queryresultsSettings.png)

There are multiple actions available as actions on the top of query results preview window.Please click “configure” button to make it visible.

| Action      | Details                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| Dark Mode   | You can change configuration of preview results display to light, dark, solarized etc. display modes |
| Scroll Mode | Free scroll or aligned scroll                                                                        |
| Read only   | Read only or editable mode (Note: editable mode doesn’t save values in the database)                 |
| Reset       | Reset button to reset the view                                                                       |
| Export      | You can export the data in CSV format                                                                |
| Copy        | You can copy the data shown in the preview. There are multiple options like CSV and JSON format      |

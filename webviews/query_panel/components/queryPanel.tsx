import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { SelectableRows } from "mui-datatables/index";

import { vscode } from '../../common/message';

class QueryPreview extends React.Component {
    state = {
        page: 0,
        count: 1,
        rowsPerPage: 20,
        data: [['Loading Data...']],
        columns: [],
        isLoading: false,
    };
    _mounted = true;

    dispatchAction(e) {
        const eventData = e.data;
        console.log(eventData);
        if (eventData.action === "queryResults") {
            console.log("Got query!");
            this.setState({
                data: eventData.rows,
                columns: eventData.columns,
                count: eventData.rows.length,
                isLoading: false,
            });
        }
    }

    componentDidMount() {
        console.log("MOUNTED");
        window.addEventListener("message", this.dispatchAction.bind(this));
    }

    componentWillUnmount() {
        this._mounted = false;
        window.removeEventListener("message", this.dispatchAction.bind(this));
    }

    render() {
        const { data, columns, page, count, isLoading, rowsPerPage, sortOrder } = this.state;

        const options = {
            filter: false,
            serverSide: true,
            count: count,
            rowsPerPage: rowsPerPage,
            elevation: 4,
            selectableRows: "none" as SelectableRows,
            onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                    case 'changePage':
                        // this.changePage(tableState.page, tableState.sortOrder);
                        break;
                    case 'sort':
                        // this.sort(tableState.page, tableState.sortOrder);
                        break;
                    default:
                        console.log('Action not handled.');
                }
            },
        };

        return <MUIDataTable
            title={"Preview"}
            data={data}
            columns={columns}
            options={options}
        />;
    }
}

export default QueryPreview;

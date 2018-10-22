export default class TableUtils {
    static desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    static stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    static getSorting(order, orderBy) {
        return order === CONST.DESC ?
            (a, b) => TableUtils.desc(a, b, orderBy) : (a, b) => -TableUtils.desc(a, b, orderBy);
    }
}

export const CONST = {
    DESC: 'desc',
    ASC: 'asc'
};
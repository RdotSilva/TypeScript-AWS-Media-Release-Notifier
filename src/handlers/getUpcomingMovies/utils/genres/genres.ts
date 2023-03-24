export const mapGenresArrayToObject = (array: any, keyField: any) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item.id;
        return obj;
    }, {});

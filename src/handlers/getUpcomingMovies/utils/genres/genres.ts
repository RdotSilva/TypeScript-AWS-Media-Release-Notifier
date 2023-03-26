/**
 * Map an array of genres to an object
 * @param array Genre array
 * @param keyField Key to use in the newly created object
 * @returns Object with genre codes by genre type
 */
export const mapGenresArrayToObject = (array: any, keyField: any) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item.id;
        return obj;
    }, {});

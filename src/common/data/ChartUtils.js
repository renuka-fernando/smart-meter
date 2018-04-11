export default class ChartUtils {
    /**
     * Generate category values or data values for the chart
     * @param categoryValues
     * @param label
     * @returns {Array}
     */
    static generateValues(categoryValues, label) {
        const category = [];
        categoryValues.map(value => {
            category.push({
                [label]: value
            });
        });

        return category;
    }
}
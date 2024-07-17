



export function Arrange({data}){
    console.log(data);
    const rearrangedData = {};

    // Iterate through each entry in initialData
    data.forEach(entry => {
        const { district, date, slots } = entry;
        const { month, year } = date;

        // Check if the month and year combination exists in rearrangedData
        if (!rearrangedData[district]) {
            rearrangedData[district] = [];
        }

        // Find if there's already an entry for the same month and year
        let found = false;
        rearrangedData[district].forEach(item => {
            if (item.date.month === month && item.date.year === year) {
                // Append slots data to existing month and year entry
                // Assuming slots is an object here, modify as per your actual data structure
                // For example, item.slots.morning.push(...slots.morning);
                found = true;
            }
        });

        // If no existing entry found, create a new entry
        if (!found) {
            rearrangedData[district].push({
                district,
                date: { month, year },
                slots: { ...slots } // Assuming slots is an object here, modify as per your actual data structure
            });
        }
    });

    // Convert rearrangedData into the desired array format
    const result = [];
    for (const district in rearrangedData) {
        if (Object.hasOwnProperty.call(rearrangedData, district)) {
            result.push(...rearrangedData[district]);
        }
    }

    return result;
}
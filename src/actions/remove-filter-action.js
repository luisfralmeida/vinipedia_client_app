
export default function removeFilterAction (type, value) {
    console.log("(remove-action) type, value:", type, value);

    return {
        type: `REMOVE_${type}`,
        payload: {
            value: value
        }
    }
}
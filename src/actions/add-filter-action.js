
export default function addFilterAction (type, value) {
    console.log("(add-action) type, value:", type, value);

    return {
        type: `ADD_${type}`,
        payload: {
            value: value
        }
    }
}
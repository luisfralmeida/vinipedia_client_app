
export default function resetFilterAction () {
    console.log("(reset-action) type, value:");

    return {
        type: `RESET`,
        payload: {
            value: null
        }
    }
}
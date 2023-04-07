function IF({ children, condition }) {
    if (condition) {
        return children;
    }

    return null;
}

export default IF;
